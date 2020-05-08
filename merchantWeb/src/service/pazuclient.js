/*
PAZU 客户端js。需要html中引入本文件
*/
window.PAZU_Config = {
    prot: "http",
    //注意，因为安全理由必须更改hosts文件，把localhost.pazu.4fang指向127.0.0.1（安装程序会自动添加，杀毒软件可能会阻止这个过程）
    server: 'localhost.pazu.4fang',
    port: 6894,
    license: ''//授权码
}

let ws = null;
let bWsReady = false;

if (!!window.WebSocket && window.WebSocket.prototype.send) {
    try {
        ws = new WebSocket("ws://" + window.PAZU_Config.server + ":" + window.PAZU_Config.port);
    } catch (ex) {
        alert('请检查依赖软件是否安装或启动');
    }
}

//判断websocket是否连上
if (ws) {
    ws.onopen = function (evt) {
        ws.send('{"f":"pazu","a":"init","d":{"pa":"init","license":"' + encodeURIComponent(PAZU_Config.license) + '","server":"' + encodeURIComponent(PAZU_Config.host) + '"}}');
    };
    ws.onmessage = function () {
        bWsReady = true;
        var o = JSON.parse(arguments[0].data);
        if (o) {
            if (o.e) {
                alert("Error[" + o.f + "." + o.a + "]:" + o.e)
            } else {
                if (o.f == 'pazu') {
                    if (o.a == 'init') {
                        //alert(o.d);
                        eval(o.d);
                    }
                }
            }
        }
        ws.close();
    };
    //错误处理
    ws.onerror = function (ev) {
        if (bWsReady) {
            if (ws.readyState < 2) {
                alert('请检查依赖软件是否安装或启动');
            }
        } else {
            alert('请检查依赖软件是否安装或启动');
            createHTTP4PAZU();
        }
    }

} else {
    createHTTP4PAZU();
}


function createHTTP4PAZU() {
    var _tag = document.createElement('script');
    _tag.type = 'text/javascript';
    _tag.async = true;
    _tag.charset = 'utf-8';
    _tag.src = (PAZU_Config.prot + "://" + PAZU_Config.server + ":" + (PAZU_Config.port ? PAZU_Config.port : 6894) + "/js/pazucloud.js?server=" + encodeURIComponent(PAZU_Config.host) + "&license=" + encodeURIComponent(PAZU_Config.license) + "&_t=" + Math.random());
    try {
        var _rootE = document.getElementsByTagName('script')[0];
        _rootE.parentNode.insertBefore(_tag, _rootE);
    } catch (ex) {
        alert("PAZU add reference error:" + ex.message);
    }
}