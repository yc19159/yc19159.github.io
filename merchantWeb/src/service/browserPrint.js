let mqtt;
//定义域名
const HOST = "http://alpha-push.fpwan.com/api/";
let PrinterDeviceList = [];//设备列表
let PapersList = [];//纸列表
let DefPaper = 'P5000x20000';//默认纸
let isInstallPAZU = false;
let supportWebSocket = false;
let DefPrinterName = '';//默认设备名

function library() {
    this.topic = '';//主题
    this.host = '';//MQTT 域名
    this.clientId = '';//客户端id
    this.username = '';//用户名
    this.password = '';//密码
    this.port = 443;//WebSocket 端口，如果使用 HTTPS 加密则配置为443,否则配置80
    this.cleansession = true;
    this.reconnectTimeout = 2000;
}

/**
 * 初始化打印机
 */
library.prototype.initPAZU = function () {
    let that = this;
    //检查浏览器是否支持websocket
    that.CheckWebSocketStandBy();
    //定义PAZU加载成功的事件处理机制
    window.onPAZUReady = function () {
        //加载打印机名称列表
        PAZU.TPrinter.getPrinters(function (ps) {
            //获得是一个以回车换行分隔的字符串
            var pa = ps.split("\r\n");
            for (var i = 0; i < pa.length; i++) {
                PrinterDeviceList.push(pa[i]);
                DefPrinterName = pa[i];
            }
            console.log(PrinterDeviceList)
            console.log(DefPrinterName)
            //获取打印纸的尺寸
            that.setPapers(DefPrinterName);
        });
    }
}

/**
 * 设置支持的纸
 * @param printerName
 */
library.prototype.setPapers = function (printerName) {
    let that = this;
    DefPrinterName = printerName;
    if (!PrinterDeviceList.length) {
        return;
    }
    //获取支持的纸
    PAZU.TPrinter.getPaperForms(printerName, function (pp) {
        var pa = pp.split("\r\n");
        pa.sort();
        for (var i = 0; i < pa.length; i++) {
            PapersList.push(pa[i])
        }
    });
    //设置打印参数 打印机名  与打印纸名
    that.doPagesetup(DefPrinterName, DefPaper);
}

/**
 * 获取支持的纸
 * @returns {[]}
 */
library.prototype.getPapers = function () {
    return PapersList;
}


/**
 * 获取支持的设备列表
 * @returns {[]}
 */
library.prototype.getPrinterName = function () {
    return PrinterDeviceList;
}

/**
 * 检查打印机工作状态
 */
library.prototype.CheckPrinterStatus = function () {
    let that = this;
    try {
        PAZU.TPrinter.getPrinters2(function (a) {
            PAZU.TPrinter.getPrinterStatus(a, function (A) {
                //获得是一个对象数组
                isInstallPAZU = true;
                //alert(JSON.stringify(A).split(",{").join(",\r\n{"));
                alert('工作正常');
                //发送请求告诉服务器打印机连上了
                //连接MQTT服务器
                that.MQTTConnect();
            });
        })
    } catch (ex) {
        console.log(ex)
        alert('请检查依赖软件是否安装或启动');
        location.reload();
    }
}

/**
 * 设置打印页面信息
 * @param paperName
 * @param printerName
 */
library.prototype.doPagesetup = function (paperName, printerName) {
    //页边距 上下左右
    PAZU.TPrinter.marginTop = 0;
    PAZU.TPrinter.marginBottom = 0;
    PAZU.TPrinter.marginLeft = 0;
    PAZU.TPrinter.marginRight = 0;
    //设置页眉页脚
    PAZU.TPrinter.footer = '';
    PAZU.TPrinter.header = '';
    //设置页眉页脚样式
    PAZU.TPrinter.fontCSS = '';
    //属性纸张方向  数据类型：整数1或者2 ， 1=纵向  2=横向
    PAZU.TPrinter.orientation = 1;
    //属性   纸张大小名称  数据类型：字符串
    PAZU.TPrinter.paperName = paperName;
    //属性   打印机名称    数据类型：字符串
    PAZU.TPrinter.printerName = printerName;
    //属性   是否缩放以适应大小打印 数据类型：Boolean true / false
    PAZU.TPrinter.isZoomOutToFit = true;
    //属性   打印份数 数据类型：整数，默认为1
    PAZU.TPrinter.copies = 1;
    //属性   页面范围 数据类型：字符串
    PAZU.TPrinter.range = '';
    //属性    是否整份打印结束后再打印下一份   数据类型：Boolean  true / false
    PAZU.TPrinter.isCopyByCopy = true;
    //PAZU.TPrinter.onlyPrintElementID="";
    //是否打印背景
    PAZU.TPrinter.isPrintBackground = false;
}

/**
 * 检查是否支持webSocket
 */
library.prototype.CheckWebSocketStandBy = function () {
    if (!!window.WebSocket && window.WebSocket.prototype.send) {
        //支持websocket，在pazuclient中对应使用 websocket通信
        supportWebSocket = true;
    } else {
        alert('浏览器版本过低请升级浏览器')
    }
    return supportWebSocket;
}

/**
 * 获取账号信息
 * @param token
 */
library.prototype.getAccount = function (token) {
    let params = {};
    params.token = token;
    let that = this;
    let data = [
        {"url": HOST + "store/getAccount", "data": params},
    ]
    Promise.all(this.HttpRequest(data, {}, 'GET')).then(
        (result) => {
            let res = result[0];
            that.topic = res.topic;
            that.username = res.username;
            that.clientId = res.clientId;
            that.password = res.password;
            that.host = res.url;
        }
    ).catch(
        (error) => {
            console.log(error)
        }
    )
}

/**
 * 连接MQTT
 * @constructor
 */
library.prototype.MQTTConnect = function () {
    const that = this;

    mqtt = new Paho.MQTT.Client(
        that.host,
        that.port,
        that.clientId
    );

    let options = {
        userName: that.username,
        password: that.password,
        useSSL: true,//如果使用 HTTPS 加密则配置为 true
        timeout: 3,
        onSuccess: onConnect,//连接成功调用
        mqttVersion: 4,
        cleanSession: that.cleansession,
        //处理连接失败
        onFailure: function (message) {
            setTimeout(that.MQTTConnect, this.reconnectTimeout);
        }
    };

    //处理超时
    mqtt.onConnectionLost = that.onConnectionLost;
    //处理接收消息
    mqtt.onMessageArrived = that.onMessageArrived;
    mqtt.connect(options);

    //处理连接MQTT成功
    function onConnect() {
        mqtt.subscribe(that.topic, {qos: 0});
        console.log('连接mqtt成功');
    }

}

/**
 * 超时重连
 */
library.prototype.onConnectionLost = function () {
    setTimeout(this.MQTTconnect, this.reconnectTimeout);
}

/**
 * 处理接收消息
 */
library.prototype.onMessageArrived = function (message) {
    let html = message.payloadString;
    //这里的html 渲染到页面
    // $('#PrintData').empty();
    // $('#PrintData').append(html);
    //打印区域     是否预览
    console.log("PAZU====================")
    console.log(PAZU)
    PAZU.print("PrintData", null, null, false);
}

/**
 * 发送http请求
 * @param urlData 请求数据
 * @param headers 请求
 * @param method  请求类型
 * @returns {Uint8Array | BigInt64Array | Promise<any>[] | Float64Array | Int8Array | Float32Array | Int32Array | Uint32Array | Uint8ClampedArray | BigUint64Array | Int16Array | Uint16Array}
 * @constructor
 */
library.prototype.HttpRequest = function (urlData, headers, method) {
    //设置请求头
    $.ajaxSettings.beforeSend = function (xhr, request) {
        let header = {
            'Accept': 'application/vnd.fp.v1+json'
        };
        header = Object.assign(header, headers);
        Object.keys(header).forEach(
            function (key) {
                xhr.setRequestHeader(key, header[key]);
            }
        );
    };
    //设置请求类型
    method = method;
    //请求数据
    return urlData.map(
        function (item) {
            return new Promise(
                (resolve, reject) => {
                    $.ajax(
                        {
                            url: item['url'],
                            type: method,
                            contentType: "application/x-www-form-urlencoded",
                            dataType: "json",
                            data: item['data'] ? item['data'] : {},
                            success: function (res) {
                                if (res.code == 0 || res.code == 200) {
                                    resolve(res.data)
                                } else {
                                    reject(res)
                                }
                            },
                            error(e) {
                                let error = JSON.parse(e.responseText);
                                reject(error);
                            }
                        }
                    )
                }
            )
        }
    );
}

export default library;