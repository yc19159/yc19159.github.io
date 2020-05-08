<template>
   <div class="orderList">
    <div class="top">
        <!-- 头部 -->
        <div class="topMid">
                <img src="../../assets/img/loginLogo.png" alt="" class="logo">
                <span class="line"></span>
                <p class="descLogin">商户系统</p>

            <div class="topRight">
                 <!-- <span class="quota">本月营业额:  </span><span :style="{'cloor':'#F75745','float':'left'}">{{100}}</span>
                 <span class="orderNum">本月订单数:</span><span :style="{'cloor':'#F75745','float':'left'}">{{100}}</span> -->
                 <div class="statusCtrl" @click="logOut">
                     <img class="close" src="../../assets/img/orderListClose.png" alt="">
                     <p class="logout">注销</p>
                 </div>
            </div>
        </div>
    </div>
    <div class="orderControl clearfix">
        <!-- 订单管理区域 -->
        <div class="orderLeft clearfix">
            <div class="leftDesc">
                <img class="orderLogo" src="../../assets/img/orderListManage.png" alt="">
                <p class="orderControlTitle">订单管理</p>
            </div>
        </div>
        <div class="orderStatus">
            <!-- 订单状态 -->
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="新订单" name="first" >
                   <div class="containNewOrder" v-if="this.activeName=='first'">
                        <van-list
                        v-model="loading"
                         loading-text=' '
                        :finished="finished"
                        :finished-text="panduanLength"
                        @load="onLoad"
                        >
                         <!-- <div :style="{'min-height':'4.9rem'}"> -->
                            <div  v-for="(item , i) in myOrderList" ref="merchantOrder" class="newOrder clearfix" :key="i" >
                                <div class="checkStatus" ref="checkStatus" v-if="checkStatus">
                                    <div class="unchecked" @click="changeChecked(i)" ref="checked" v-model="checkedValue">
                                    {{checkedValue}}
                                    </div>
                                </div>
                                <div class="clearfix orderDetail" :class="checkStatus? 'smallOrderdetail':'orderDetail'" ref="orderDetail" >
                                    <!-- 订单详情 -->
                                    <div class="newOrderLeft clearfix">
                                        <div :style="{'border-right': '2px dashed #CECECE',}">
                                            <div :style="{'width':'2.33rem'}" class="clearfix">
                                                    <p class="number">{{item.orderNum}}号</p>
                                                    <p class="takeOut">外卖订单</p>
                                                    <p class="time">{{item.createTime}}</p>
                                                </div>
                                            <div class="kehu">
                                                <span class="kehuName">{{item.user.userName}}</span>
                                                <span class="kehuMobile">{{item.user.userPhone}}</span>
                                                <span class="distance">{{item.deliveryDistance}}m</span>
                                                <p class="address">{{item.user.address}}</p>
                                            </div>
                                            <div class="fee">
                                                <span class="distributeFee">配送费：¥{{(item.deliveryMoney/100).toFixed(2)}}</span>
                                                <p class="actualFee">顾客实付金额：¥{{(item.wmo_pay_money/100).toFixed(2)}}</p>
                                            </div>
                                            <div class="beiZhu" :style="{'width':'2.23rem','margin-top':'0.1rem'}">
                                                 <p>备注： {{item.remark}}</p>
                                            </div>
                                        </div>
                                            <div class="distribute" ref="distribute">
                                                    <button v-if="item.type==1" class="zjDis" @click="deliver(1,item.orderSn,i,item.type,1)">自己配送</button>
                                                    <button v-if="item.type==1" class="ptDis" @click="deliver(2,item.orderSn,i,item.type,1)">平台配送</button>
                                                    <!-- <button class="printOrder" v-if="!checkStatus" @click="printOrder(i)">打印订单</button> -->
                                                    <button v-if="item.type==2" class="finish" @click="deliver(6,item.orderSn,i,item.type,2)">完成</button>
                                            </div>
                                    </div>
                                    <div class="neworderRight clearfix">
                                        <div class="orderInfo" v-for="(goods , index) in item.goods" :key="index">
                                            <img :src="goods.goodsImage" alt="图片" class="goodsImg">
                                            <p class="goodsName">{{goods.goodsName}}</p>
                                            <p class="goodsNum">X{{goods.number}}</p>
                                            <p class="goodsPrice">¥{{(goods.totalPrice/100).toFixed(2)}}</p>
                                        </div>

                                    </div>
                            </div>
                            </div>
                             <div v-if="!isLoading&&myOrderList.length==0" class="noOrder">
                                <img src="../../assets/img/orderListNoOrder.png" alt="">
                                <p >暂无订单信息</p>
                            </div>
                            <div v-if="isLoading" class="loading" :style="{'margin-top':'0.1rem','margin-left':'0.16rem'}">
                                loading......
                            </div>
                         <!-- </div>   -->
                        </van-list>
                    </div>


                </el-tab-pane>
                <el-tab-pane label="待配送" name="second">
                    <div class="containNewOrder" v-if="this.activeName=='second'">
                         <van-list
                        v-model="loading"
                         loading-text=' '
                        :finished="finished"
                        :finished-text="panduanLength"
                        @load="onLoad"
                        >
                         <!-- <div :style="{'min-height':'4.9rem'}"> -->
                            <div v-for="(item , i) in myOrderList" ref="merchantOrder" class="newOrder clearfix" :key="i">
                                <div class="checkStatus" ref="checkStatus2" v-if="checkStatus">
                                    <div class="unchecked" @click="changeChecked(i)" ref="checked" v-model="checkedValue">
                                    {{checkedValue}}
                                    </div>
                                    <!-- <img v-if="isPrint" src="../../assets/img/orderListUnchecked.png" alt="" class="unchecked" @click="changeChecked(i)">
                                    <img v-else src="../../assets/img/orderListUnchecked.png" alt="" class="unchecked" @click="changeChecked(i)"> -->
                                </div>
                                <div class="clearfix orderDetail" :class="checkStatus? 'smallOrderdetail':'orderDetail'" ref="orderDetail2" >
                                    <!-- 订单详情 -->
                                    <div class="newOrderLeft clearfix">
                                        <div :style="{'border-right': '2px dashed #CECECE',}">
                                            <div :style="{'width':'2.33rem'}" class="clearfix">
                                                    <p class="number">{{item.orderNum}}号</p>
                                                    <p class="takeOut">外卖订单</p>
                                                    <p class="time">{{item.createTime}}</p>
                                                </div>
                                            <div class="kehu">
                                                <span class="kehuName">{{item.user.userName}}</span>
                                                <span class="kehuMobile">{{item.user.userPhone}}</span>
                                                <span class="distance">{{item.deliveryDistance}}m</span>
                                                <p class="address">{{item.user.address}}</p>
                                            </div>
                                            <div class="fee">
                                                <span class="distributeFee">配送费：¥{{(item.deliveryMoney/100).toFixed(2)}}</span>
                                                <p class="actualFee">顾客实付金额：¥{{(item.wmo_pay_money/100).toFixed(2)}}</p>
                                            </div>
                                            <div class="beiZhu" :style="{'width':'2.23rem','margin-top':'0.1rem'}">
                                                 <p>备注： {{item.remark}}</p>
                                            </div>
                                        </div>
                                            <div class="distribute" >
                                                    <button v-if="item.deliveryType==1" @click="deliver(5,item.orderSn,i,2,1)">出发</button>
                                                    <button class="printOrder" v-if="!checkStatus" @click="printOrder(i)">打印订单</button>

                                            </div>
                                    </div>
                                    <div class="neworderRight clearfix">
                                        <div class="orderInfo" v-for="(goods , index) in item.goods" :key="index">
                                            <img :src="goods.goodsImage" alt="图片" class="goodsImg">
                                            <p class="goodsName">{{goods.goodsName}}</p>
                                            <p class="goodsNum">X{{goods.number}}</p>
                                            <p class="goodsPrice">¥{{(goods.totalPrice/100).toFixed(2)}}</p>
                                        </div>

                                    </div>
                            </div>
                            </div>
                             <div v-if="!isLoading&&myOrderList.length==0" class="noOrder">
                                <img src="../../assets/img/orderListNoOrder.png" alt="">
                                <p >暂无订单信息</p>
                            </div>
                            <div v-if="isLoading" class="loading" :style="{'margin-top':'0.1rem','margin-left':'0.16rem'}">
                                loading......
                            </div>
                         <!-- </div> -->
                        </van-list>
                    </div>

                </el-tab-pane>
                <el-tab-pane label="配送中" name="third">
                    <div class="containNewOrder" v-if="this.activeName=='third'">
                       <van-list
                        v-model="loading"
                         loading-text=' '
                        :finished="finished"
                        :finished-text="panduanLength"
                        @load="onLoad"
                        >
                        <!-- <div :style="{'min-height':'4.9rem'}"> -->
                            <div v-for="(item , i) in myOrderList" ref="merchantOrder" class="newOrder clearfix" :key="i">
                                <div class="checkStatus" ref="checkStatus3" v-if="checkStatus">
                                    <div class="unchecked" @click="changeChecked(i)" ref="checked" v-model="checkedValue">
                                    {{checkedValue}}
                                    </div>
                                </div>
                                <div class="clearfix orderDetail" :class="checkStatus? 'smallOrderdetail':'orderDetail'" ref="orderDetail3" >
                                    <!-- 订单详情 -->
                                    <div class="newOrderLeft clearfix">
                                        <div :style="{'border-right': '2px dashed #CECECE',}">
                                            <div :style="{'width':'2.33rem'}" class="clearfix">
                                                    <p class="number">{{item.orderNum}}号</p>
                                                    <p class="takeOut">外卖订单</p>
                                                    <p class="time">{{item.createTime}}</p>
                                                </div>
                                            <div class="kehu">
                                                <span class="kehuName">{{item.user.userName}}</span>
                                                <span class="kehuMobile">{{item.user.userPhone}}</span>
                                                <span class="distance">{{item.deliveryDistance}}m</span>
                                                <p class="address">{{item.user.address}}</p>
                                            </div>
                                            <div class="fee">
                                                <span class="distributeFee">配送费：¥{{(item.deliveryMoney/100).toFixed(2)}}</span>
                                                <p class="actualFee">顾客实付金额：¥{{(item.wmo_pay_money/100).toFixed(2)}}</p>
                                            </div>
                                            <div class="beiZhu" :style="{'width':'2.23rem','margin-top':'0.1rem'}">
                                                 <p>备注： {{item.remark}}</p>
                                            </div>
                                        </div>
                                            <div class="distribute" ref="distribute3">
                                                     <button v-if="item.deliveryType==1" @click="deliver(6,item.orderSn,i,2,1)">送达</button>
                                                    <button class="printOrder" v-if="!checkStatus" @click="printOrder(i)">打印订单</button>

                                            </div>
                                    </div>
                                    <div class="neworderRight clearfix">
                                        <div class="orderInfo" v-for="(goods , index) in item.goods" :key="index">
                                            <img :src="goods.goodsImage" alt="图片" class="goodsImg">
                                            <p class="goodsName">{{goods.goodsName}}</p>
                                            <p class="goodsNum">X{{goods.number}}</p>
                                            <p class="goodsPrice">¥{{(goods.totalPrice/100).toFixed(2)}}</p>
                                        </div>

                                    </div>
                            </div>
                            </div>
                            <div v-if="!isLoading&&myOrderList.length==0" class="noOrder">
                                <img src="../../assets/img/orderListNoOrder.png" alt="">
                                <p >暂无订单信息</p>
                            </div>
                            <div v-if="isLoading" class="loading" :style="{'margin-top':'0.1rem','margin-left':'0.16rem'}">
                                loading......
                            </div>
                            <!-- </div> -->
                        </van-list>
                    </div>

                </el-tab-pane>
                <el-tab-pane label="已完成" name="fourth">
                      <div class="containNewOrder" v-if="this.activeName=='fourth'">
                           <van-list
                            v-model="loading"
                             loading-text=' '
                            :finished="finished"
                            :finished-text="panduanLength"
                            @load="onLoad"
                            >
                            <!-- <div :style="{'min-height':'4.9rem'}"> -->
                            <div v-for="(item , i) in myOrderList" ref="merchantOrder" class="newOrder clearfix" :key="i">
                                <div class="checkStatus" ref="checkStatus4" v-if="checkStatus">
                                    <div class="unchecked" @click="changeChecked(i)" ref="checked" v-model="checkedValue">
                                    {{checkedValue}}
                                    </div>
                                    </div>
                                    <div class="clearfix orderDetail" :class="checkStatus? 'smallOrderdetail':'orderDetail'" ref="orderDetail4" >
                                    <!-- 订单详情 -->
                                    <div class="newOrderLeft clearfix">
                                        <div class="clearfix" :style="{'border-right': '2px dashed #CECECE',}">
                                            <div :style="{'width':'2.33rem'}" class="clearfix">
                                                    <p class="number">{{item.orderNum}}号</p>
                                                    <p class="takeOut">外卖订单</p>
                                                    <p class="time">{{item.createTime}}</p>
                                                </div>
                                            <div class="kehu">
                                                <span class="kehuName">{{item.user.userName}}</span>
                                                <span class="kehuMobile">{{item.user.userPhone}}</span>
                                                <span class="distance">{{item.deliveryDistance}}m</span>
                                                <p class="address">{{item.user.address}}</p>
                                            </div>
                                            <div class="fee">
                                                <span class="distributeFee">配送费：¥{{(item.deliveryMoney/100).toFixed(2)}}</span>
                                                <p class="actualFee">顾客实付金额：¥{{(item.wmo_pay_money/100).toFixed(2)}}</p>
                                            </div>
                                            <div class="beiZhu" :style="{'width':'2.23rem','margin-top':'0.1rem'}">
                                                 <p>备注： {{item.remark}}</p>
                                            </div>
                                        </div>
                                            <div class="distribute" ref="distribute4">

                                                    <button class="printOrder" v-if="!checkStatus" @click="printOrder(i)">打印订单</button>

                                            </div>
                                    </div>
                                    <!-- <div> -->
                                    <div class="neworderRight clearfix">
                                        <!-- <div class="clearfix" :style="{'box-sizing':'border-box'}"> -->
                                        <div class="orderInfo" v-for="(goods , index) in item.goods" :key="index">
                                            <img :src="goods.goodsImage" alt="图片" class="goodsImg">
                                            <p class="goodsName">{{goods.goodsName}}</p>
                                            <p class="goodsNum">X{{goods.number}}</p>
                                            <p class="goodsPrice">¥{{(goods.totalPrice/100).toFixed(2)}}</p>
                                        </div>
                                        <!-- </div> -->
                                    </div>
                                    <!-- </div> -->
                                    </div>
                                </div>
                                 <div v-if="!isLoading&&myOrderList.length==0" class="noOrder">
                                        <img src="../../assets/img/orderListNoOrder.png" alt="">
                                        <p >暂无订单信息</p>
                                </div>
                                <div v-if="isLoading" class="loading" :style="{'margin-top':'0.1rem','margin-left':'0.16rem'}">
                                 loading......
                               </div>
                            <!-- </div> -->
                     </van-list>
                    </div>

                </el-tab-pane>

            </el-tabs>
            <button v-if="this.activeName!='first'&&!checkStatus" class="batchPrint" @click="batchPrint" ref="batchPrintButton">批量打印</button>
                     <div class="sureOrCancle" ref="sureOrCancle">
                        <button class="sure" @click="surePrint">确认打印</button>
                        <button class="cancle" @click="cancleBatchPrint">取消批量打印</button>
                    </div>
            <div class="print">
                <!-- <div class="printTop" v-if="state==1">
                        <p class="printTitle">打印机</p>
                        <p class="printType">{{printType}}</p> -->
                        <!-- <p class="printPage">支持纸张</p> -->
                        <!-- <p class="pageContent"><span v-for="(item , i) in printPaper" :key='i'> {{item}}</span> </p> -->
                        <!-- <button class="check" @click="checkPrint" ref="checkButton">检查</button> -->
                <!-- </div> -->
                <!-- <div class="printTop" v-if="printStatus==3">
                        <p class="printTitle">打印机</p>
                        <p class="breaking">已断开</p>

                </div> -->
                <!-- <div class="printQueue" v-if="printing">打印任务进行中，共打印10条，正在打印第一条</div> -->
                <div class="preview clearfix" v-if="state==1">
                        <!-- <p class="previewDecs">对账单预览</p> -->
                        <div class="bg_PrintData">
                        <!-- <div id="PrintData" :style="{'border':'1px dashed red' ,'text-align':'center','padding':'0px','width':'80%','margin': '0px'}"></div> -->
                        <div class="print">
                            <iframe
                                :src="'http://alpha-push.fpwan.com/usbPrint?token='+loginToken"
                                frameborder="0"
                                width="100%"
                                height="100%"
                                scrolling="yes"
                            ></iframe>
                </div>
                        </div>
                </div>
                <div class="preview clearfix" v-if="state==3">
                         <p class="previewDecs">还未添加打印机</p>
                         <div class="bg_PrintData" :style="{'height':'5.04rem'}">
                            <!-- <div id="PrintData" :style="{'border':'1px dashed red' ,'text-align':'center','padding':'0px','width':'80%','margin': '0px'}"></div> -->
                            <img src="../../assets/img/orderListPrintMsg.png" alt="" class="unAddPrintImg">
                            <p :style="{'text-align': 'center','margin-top':'0.15rem','font-size':'0.14rem'}">打印机背面</p>
                            <div class="printDetail">
                                <div>
                                    <span >打印机型号</span>
                                    <select v-model="getPrintModel">
                                        <option v-for="(item , i) in printModel"  :value="i*1+1" :key="i">{{item.model}}</option>
                                    </select>
                                </div>
                                <div>
                                    <span >接口类型</span>
                                    <select v-model="getInterfaceType">
                                        <option v-for="(item , i) in interfaceType"  :value="i*1+1" :key="i">{{item.name}}</option>
                                    </select>
                                </div>
                                <div>
                                    <span >打印纸宽</span>
                                    <select v-model="getPaperWidth">
                                        <option v-for="(item , i) in paperWidth" :value="i*1+1" :key="i">{{item.name}}</option>
                                    </select>
                                </div>
                                <div>
                                    <span >USB+蓝牙编码</span>
                                    <input v-model="sn" type="text">
                                </div>
                                <button class="addPrint" @click="addPrint">添加打印机</button>
                            </div>
                         </div>
                </div>
        </div>
        </div>


    </div>
    <div class="printStatus" ref="printPopup">
        <!-- 点击检查后弹出层 -->
           <div class="statusContent" v-if="printStatus==1" @click="popupClose">
                <p class="statusTitle">正在检查打印机，请稍后</p>
                <img src="../../assets/img/orderListState1.png" alt="" class="loadingImg">
                <img src="../../assets/img/orderListPrint.png" alt="" class="printImg">
           </div>
           <div class="statusContent" v-if="printStatus==2" @click="popupClose">
                <p class="statusTitle">打印机连接正常</p>
                <img src="../../assets/img/orderListState2.png" alt="" class="state2Img">
                <img src="../../assets/img/orderListPrint.png" alt="" class="printImg">
                <button class="printStatusSure">确定</button>
           </div>
           <div class="statusContent" v-if="printStatus==3" @click="popupClose">
                <p class="statusTitle">打印机已断开</p>
                <img src="../../assets/img/orderListState3.png" alt="" class="state3Img">
                <img src="../../assets/img/orderListPrint.png" alt="" class="printImg">
                <button class="printStatusSure">确定</button>
           </div>
    </div>
    <orderFoot></orderFoot>
    </div>
</template>



<script>

import orderFoot from '@/components/orderFoot.vue';
import {getList , orderTaking,getPrintOrder,getSn,getPrinterData,printConnect} from '../../service/getData'
import Vue from 'vue';
import { List } from 'vant';

// import library from "../../service/browserPrint.js";

Vue.use(List);


export default {
    data() {
        return {
            isLoading: true,//判断是否在加载数据
            activeName: 'first',
            state: 3,
            printStatus: 1,
            myOrderList:[],
            oldShuaxinOrderList:[],
            shuaxinOrderList:[],
            checkedValue: '√',
            printing: true,
            status: 2,
            loading: false,
            finished: false,
            page: 1,
            isPrint: true,
            // htmlDom:'',
            printType: '',
            printPaper: [],
            sn: '',
            printModel:[],  //打印机型号
            getPrintModel: 1,
            interfaceType: [], //打印机型号
            getInterfaceType: 1,
            paperWidth: [], //打:印纸宽
            getPaperWidth:1,
            checkPrintModel: '',
            checkStatus: false,//是否展示check
            loginToken: '',
            panduanLength: '',//判断是否显示更多
            timer: null,
           
        }
    },
    components:{
        orderFoot,
    },
    methods: {
         shuaxin(){
            
              this.timer=setInterval(() =>{
                    //    this.myOrderList=[];
                      let shuaxinParams={
                        token: localStorage.token,
                        channelId: localStorage.channelId,
                        type: 0,
                        status: 2,
                        page: 1,
                        pageSize: 10,
                        userId: localStorage.userId,
                        delivery: 0,
                        identity: 2,
                        storeId: localStorage.storeId
                    }
                   getList(shuaxinParams).then(res=>{
                       console.log('刷新后数据长度'+res.data.data.list.length)

                       if(res.data.data.list.length>0){
                           this.shuaxinOrderList=res.data.data.list;
                           if(this.shuaxinOrderList[0].orderSn!=this.oldShuaxinOrderList[0].orderSn){
                            //    this.$alert('有新订单生产，我们以为您刷新');
                               this.activeName='first';
                               this.myOrderList=res.data.data.list;
                               this.loading=false;
                               this.finished=false;
                               this.page=2;
                               this.oldShuaxinOrderList=this.shuaxinOrderList;
                           }
                    //    console.log(this.shuaxinOrderList)
                    //  console.log('myOrderList长度'+this.myOrderList.length)
                       }
                       
                   })
              },5000)
           },
          useGetPrinterData(){
                var printDataParam={
                    token: localStorage.token
                }
                getPrinterData(printDataParam).then(res=>{
                    console.log('AAAAAAAA======GetPtintData')
                    console.log(res.data.data)
                    this.printModel=res.data.data.model;
                    this.interfaceType=res.data.data.interfaceType;
                    this.paperWidth=res.data.data.paper;
                })
          },
          getPrintSn(){
              var getSnparam={
                   token:localStorage.token
                  };
                //   console.log("getPrintSn===================");
                getSn(getSnparam).then(res=>{
                  if(res.data.data.flag==1){
                      this.state=1
                  this.printType=res.data.data.device[0].model;
                  this.sn=res.data.data.device[0].sn;
                  }else{
                      this.state=3
                  }
                 
                //   console.log(this.sn);
                  console.log(res)
              });

          },
          printOrder(index){
                  var orderParam={
                  token: localStorage.token,
                  ids: this.myOrderList[index].orderSn,
                  sn: this.sn
                 }
                 
                   getPrintOrder(orderParam).then(res=>{
                          console.log(this.sn)
                             console.log("printOrder===================");
                             console.log(res)
                        })
          },
          addPrint(){
             console.log(this.getPrintModel)   
        //    console.log(this.getInterfaceType)
        //    console.log(this.getPaperWidth)
             var addPrintParam={
                 token: localStorage.token,
                 sn: this.sn,
                 interfaceType: this.getInterfaceType,
                 paper: this.getPaperWidth,
                 model: this.getPrintModel,

             };
               console.log(this.sn)
             printConnect(addPrintParam).then(res=>{
                 console.log(res);
                 if(res.data.code==0){
                     this.state=1
                 }
             })
          },
          changeOrderDom(){
             
          },
          batchPrint(){
            //   this.$refs.batchPrintButton.style.display='none';
              this.$refs.sureOrCancle.style.display='block';
              this.checkStatus=true;

          },
          cancleBatchPrint(){
            //   this.$refs.batchPrintButton.style.display='block';
              this.$refs.sureOrCancle.style.display='none';
              this.checkStatus=false;

          },
          surePrint(){
               var idsList=[]
              for(var i=0;i<this.myOrderList.length;i++){
                    // console.log(this.$refs.checked[i].className)
                    if(this.$refs.checked[i].className=='checked'){
                       idsList.push(this.myOrderList[i].orderSn);
                    }
                }
                 idsList=idsList.join('|')
                  console.log(idsList);
                  var batchPrintParam={
                     token: localStorage.token,
                     ids: idsList,
                     sn: this.sn
                  }
                 
                  getPrintOrder(batchPrintParam).then(res =>{
                    console.log(res)
                  })
            //  if(this.activeName=='first'){
            //     for(var i=0;i<this.myOrderList.length;i++){
            //         if(this.$refs.checked[i].className=='checked'){
            //         console.log(this.$refs.merchantOrder[i])
            //         }
            //     }
            //  }else if(this.activeName=='second'){
            //    for(var i=0;i<this.myOrderList.length;i++){
            //         console.log(this.$refs.checked[i].className)
            //         if(this.$refs.checked[i].className=='checked'){

            //             console.log(this.$refs.merchantOrder[i])
            //         }
            //     }
            //  }else if(this.activeName='third'){

            //  }else{

            //  }
          },
          checkPrint(){
            //   this.$refs.printPopup.style.display='block';
            //  this.CheckPrinterStatus()

             this.obj.CheckPrinterStatus()
          },
          //点击屏幕检查之外的地方弹出层消失
          popupClose(){
              var that=this;
            //  document.onclick=function(e){
                //  console.log(1)
                //  if(e.target!=that.$refs.checkButton){
                     that.$refs.printPopup.style.display='none';
                //  }
            //  }
        },
          //改变选择状态
          changeChecked(i){
              document.onclick=function(e){
                  if(e.target.className=='checked'){
                     e.target.className='unchecked';
                     this.checkedValue='';
                  //    console.log( e.target.innerHtml)
                  }else if(e.target.className=='unchecked'){
                     e.target.className='checked';
                    this.checkedValue='√';
                     console.log(e.target.innerHtml)
                  }
              }
              // if(this.$refs.checked[i].className=='checked'){
              //     this.$refs.checked[i].className='unchecked';
              //     for(var i=0; i<this.$refs[unchecked].length;i++){
              //      this.$refs.unchecked[i].innerHtml='';
              //     }

              // }else{
              //     this.$refs.checked[i].className='checked';
              // }

          },
          getOldOrderList(){
             let oldParams={
                token: localStorage.token,
                channelId: localStorage.channelId,
                type: 0,
                status: 2,
                page: 1,
                pageSize: 10,
                userId: localStorage.userId,
                delivery: 0,
                identity: 2,
                storeId: localStorage.storeId
            };
             getList(oldParams).then(res => {
                        this.oldShuaxinOrderList=res.data.data.list;
                        console.log('oldShuaxinOrderList=====yc')
                        console.log(this.oldShuaxinOrderList)
                  
             })

          },
          useGetList(){

            let params={
                token: localStorage.token,
                channelId: localStorage.channelId,
                type: 0,
                status: this.status,
                page: this.page,
                pageSize: 10,
                userId: localStorage.userId,
                delivery: 0,
                identity: 2,
                storeId: localStorage.storeId
            }

              getList(params).then((res)=>{
                 
                  if(res.data.data.list.length>0){
                        for (var i=0; i<res.data.data.list.length;i++){
                            this.myOrderList.push(res.data.data.list[i])
                        }
                         console.log('有长度')
                         this.panduanLength='没有更多订单了';
                    }else{
                         console.log('没有长度')
                          this.panduanLength='';
                    } 
                   this.isLoading=false;
                  this.page++
                  this.loading=false;
                  if(res.data.data.list.length < 10){
                   
                    this.finished = true
                  }
                  console.log(res)
                  console.log(this.myOrderList)
                  
              })
          },

          handleClick(){
            //   this.$refs.batchPrintButton.style.display='block';
              this.checkStatus=false;
              this.$refs.sureOrCancle.style.display='none';
                this.myOrderList=[];
                this.page=1;
                this.loading=false;
                this.finished=false;
                this.isLoading=true;
               if(this.activeName=='first'){
                this.status=2
               }else if(this.activeName=='second'){
                  this.status=[3,4]
               }else if(this.activeName=='third'){
                   this.status=5
               }else{
                  this.status=[6,8,9,10]
              }
            //   this.useGetList();
              this.onLoad()
          },
          deliver(status,orderSn,index,type,orderType){
                  let orderTakingParam={
                  storeId:localStorage.storeId,
                  type: type,
                  orderId: orderSn,
                  status: status,
                  orderType: orderType,
                  channelId: localStorage.channelId,
                  token: localStorage.token
                };
                 orderTaking(orderTakingParam).then((res)=>{
                   console.log(res)
                    if(res.data.code=='0'){
                       this.myOrderList.splice(index,1);
                       if(orderType==1){
                        //   this.$alert('接单成功');
                       }else{
                        //   this.$alert('已完成');
                       } 
                      
                    }else{
                        this.$alert(res.data.msg);
                    }
                })
          },
          onLoad(){
             this.loading = true
             this.useGetList()
            //  this.batchPrint()
          },
          logOut(){
              localStorage.removeItem('token');
              this.$router.push({name: 'userLogin'})
          },
          panDuanLogin(){
              if(!localStorage.token){
                  this.$router.push({name:'userLogin'})
              }
          }
        },
        created() {
           this.getPrintSn();
           this.useGetPrinterData();
           this.panDuanLogin();
            this.shuaxin()
             console.log("printType===================");
             this.loginToken=localStorage.token;
            if(this.getPrintModel==1){
                this.printType='XP-58ⅡH'
               console.log('XP-58ⅡH');
            }else if(this.getPrintModel==2){
                console.log('FP-V58WC');
                this.printType='FP-V58WC'

            }
           
          /*
            PAZU 客户端js。需要html中引入本文件
            */
           
        },
        mounted() {
           this.getOldOrderList();
        },
        destroyed() {
             clearInterval(this.timer);
              this.timer = null;
        },
        computed: {

        },

}


</script>

<style lang="scss" scoped>
html{
      scrollbar-track-color:#fff;
}
body{
    // scrollbar-track-color: white;
    
}

 .top{
     width: 14.4rem;
     height: 0.9rem;
     background: white;
     overflow: hidden;
     .topMid{
         overflow: hidden;
         height: 0.26rem;
         margin-top: 0.29rem;
         margin-left: 0.6rem;
         .logo{
             display: block;
             width: 0.28rem;
             height: 0.28rem;
             float: left;
         }
         .line{
             display: block;
             float: left;
             width: 1px;
             height: 0.28rem;
             background: #D8D8D8;
             margin-left: 0.12rem;
         }
         .descLogin{
             font-size: 0.16rem;
             float: left;
             line-height: 0.28rem;
             margin-left: 0.12rem;
         }
               .topRight{
             float: left;
             font-size: 0.16rem;
             overflow: hidden;
             margin-left: 6.4rem;
             .quota{
                 display: block;
                 float: left;
                 width: 0.96rem;
             }
             .orderNum{
                 display: block;
                 float: left;
                 width: 0.96rem;
                 margin-left: 0.8rem;
             }
            .statusCtrl{
                float: right;
                overflow: hidden;
                margin-left: 4.3rem;
                .close{
                    width: 0.19rem;
                    height: 0.2rem;
                    display: block;
                    float: left;
                }
                .logout{
                    float: left;
                    margin-left: 0.12rem;
                    height: 0.28rem;
                    font-size: 0.16rem;
                }
            }

         }
     }
 }
//
 .orderControl{
     width: 14.4rem;
     overflow: hidden;
    //  height: 6rem;
     .orderLeft{
         width: 2.2rem;
        //  height: 6rem;
         float: left;
         overflow: hidden;

         .leftDesc{
            background: #FFF5F4;
            width: 100%;
            height: 0.84rem;
            .orderLogo{
                display: block;
                width: 0.14rem;
                height: 0.14rem;
                float: left;
                margin-top: 0.34rem;
                margin-left: 0.58rem;
            }
            .orderControlTitle{
                float: left;
                font-size: 0.16rem;
                font-weight: bold;
                margin-top:  0.32rem;
                // width: 0.64rem;
                height: 0.16rem;
                color: #F75745;
                text-align: center;
                margin-left: 0.05rem;
            }
            }
     }
     .orderStatus{
      width: 12.2rem;
      float: left;
      background: #FFF5F4;
      font-size: 0.16rem;
      position: relative;
    //   overflow: hidden;
      .el-tabs{
          width: 6.36rem;
          background: #FFFFFF;
          margin-top: 0.16rem;
          margin-left: 0.16rem;
          float: left;
         /deep/ .el-tabs__header{
              margin: 0 0;
          }
          /deep/ .el-tabs__nav{
            width: 100%;
            border: 0;
            .el-tabs__item{
                width: 25%;
                height: 0.56rem;
                float: left;
                background: #E3E3E3;
                text-align: center;
                line-height: 0.56rem;
                color:#F75745;
                 border: 0;
            }
            .is-active{
                background:#FFFFFF;
                border: 0;
            }
           }
           /deep/ .el-tabs__content{
               background: #F2F2F2;
            //    margin-bottom: 0.1rem;
               background: #FFFFFF;
               height: 5.36rem;

           }
      }
       .containNewOrder::-webkit-scrollbar-thumb{
           background: #F75745;
           -webkit-border-radius: 0.04rem;
          }
        .containNewOrder::-webkit-scrollbar{
            border: none;
            background: white;
             width: 0.08rem;
            //  height: 3rem;
            //  margin-right: 0.04rem; 
        }
      .containNewOrder{
          height: 4.8rem;
          width: 6.33rem;//全宽6.36
          overflow: hidden;
          overflow-y: scroll;
          -ms-overflow-style: none;
          .van-list{
            //   min-height: 4.85rem;
              /deep/ .van-list__finished-text{
                  margin-left: 0.2rem;
                  margin-top: 0.3rem;
                  font-size: 0.15rem;
                  color: #F75745; 
                  text-align: center;            
                  }
              /deep/ .van-loading__text{
                      margin-left: 0.2rem;;
                  }
          }
      }
      .noOrder{
          widows: 6.04rem;
          height: 4.4rem;
          margin-top: 0.1rem;
          margin-left: 0.16rem;
          overflow: hidden;
          img{
              display: block;
              width: 0.9rem;
              height: 0.9rem;
              margin:  auto;
              margin-top: 1.33rem;
          }
          p{
              width: 1rem;
              margin: 0.16rem auto;
              font-size: 0.14rem;
              color: #666666;
          }
      }
      .newOrder{
          width: 6.04rem;
          overflow: hidden;
          margin-top: 0.1rem;
        //   background: #FFF5F4;
          font-size: 0.14rem;
          margin-left: 0.16rem;
          color: #666666;
        .checkStatus{
        width: 0.4rem;
        height: 2.4rem;
        background: #ffffff;
        float: left;
        // display: none;
        .checked{
            width: 0.2rem;
            height: 0.2rem;
            background: #409EFF;
            border-radius: 0.1rem;
            margin-top: 0.8rem;
            text-align: center;
            line-height: 0.2rem;
            color: #ffffff;
        }
        .unchecked{
            width: 0.2rem;
            height: 0.2rem;
            border-radius: 0.1rem;
            border: 1px solid #D3DCE4;
            color: white;
             margin-top: 0.8rem;
        }
       }
       .orderDetail{
           width: 6.14rem;
           overflow: hidden;
           background: #FFF5F4;
       }
       .smallOrderdetail{
              width: 5.64rem;
              background: #FFF5F4;
         }

          .newOrderLeft{
          width: 2.43rem;
          padding-left: 0.1rem;
          margin-top: 0.15rem;
          float: left;
        //   border-right: 2px dashed #CECECE;
          margin-bottom: 0.15rem;
          .number{
              float: left;
              font-size: 0.18rem;
              color: #333333;
          }
          .takeOut{
              float: left;
              margin-top: 0.06rem;
              margin-left: 0.06rem;
              font-size: 0.12rem;
          }
          .time{
              margin-top: 0.06rem;
              margin-left: 0.04rem;
              float: left;
               font-size: 0.12rem;
          }

          }
          .neworderRight::-webkit-scrollbar {
            // width: 0px;
            background: #F75745;
            width: 0.1rem;
            -webkit-border-radius: 0.04rem;
            border: none;
            // height: 1.07rem;
          }
          .neworderRight::-webkit-scrollbar-thumb{
           background: #F75745;
           
          }
          .neworderRight::-ms-scrollbar{
            width: 0px;
           }
          .neworderRight{
              float: left;
              width: 3.2rem;
              height: 1.58rem;
              margin-top: 0.2rem;
              overflow: hidden;
              overflow-y:auto;;
            //   overflow-x:hidden;//去除横向滚动条
              .orderInfo{
                  width: 2.97rem;
                  height: 0.32rem;
                  margin-top: 0.2rem;
                  margin-left: 0.2rem;
                  .goodsImg{
                      width: 0.32rem;
                      height: 0.32rem;
                      display: block;
                      float: left;
                    //   border: 1px solid grey;
                  }
                  .goodsName{
                      width: 1.12rem;
                      line-height: 0.32rem;
                      float: left;
                      margin-left: 0.06rem;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;

                  }
                  .goodsNum{
                      float: left;
                      margin-left: 0.25rem;
                      line-height: 0.32rem;
                  }
                  .goodsPrice{
                      float: left;
                      margin-left: 0.3rem;
                      line-height: 0.32rem;
                  }
              }
          }
          .kehu{
           width: 2.33rem;
           margin-top: 0.16rem;
           .kehuName{
           }
           .kehuMobile{

           }
           .distance{
               margin-left: 0.2rem;
           }
           .address{
               margin-top: 0.1rem;
           }
          }
          .fee{
              width: 2.33rem;
              margin-top: 0.1rem;
               .actualFee{
                   margin-top: 0.1rem;
               }
          }
           .distribute{
              width: 5.73rem;
              margin-top: 0.2rem;
              font-size: 13px;
              button{
                   width: 0.88rem;
                   height: 0.24rem;
                   background: #F75745;
                   text-align: center;
                   border-radius: 0.04rem;
                   line-height: 0.24rem;
                   color: white;
              }
              .zjDis{

              }
              .ptDis{
                  margin-left:0.24rem;
              }
              .printOrder{
                  float: right;
                  margin-right: 0.35rem;
              }
          }
      }

     }
     .batchPrint{
          width: 1.2rem;
          height: 0.36rem;
          text-align: center;
          line-height: 0.36rem;
          margin-top: 0.1rem;
          background: #F75745;
          color: #FFFFFF;
          border-radius: 0.04rem ;
          margin-left: 0.16rem;
          position: absolute;
          left: 0.1rem;
          top: 5.5rem;
          display: block;
      }
      .sureOrCancle{
          margin-top:  0.1rem;
          position: absolute;
          display: none;
           left: 0.1rem;
          top: 5.5rem;
            button{
                height: 0.36rem;
                text-align: center;
                line-height: 0.36rem;
                background: #F75745;
                color: #FFFFFF;
                border-radius: 0.04rem ;
                margin-left: 0.16rem;
            }
                  .sure{
                     width: 1.2rem;
                  }
                  .cancle{
                     width: 1.46rem;
                  }
              }
     .print{
         width: 5.28rem;
         height: 5.82rem;
         background: #FDFDFD;
         float: left;
         margin-top: 0.16rem;
         overflow: hidden;
         margin-left: 0.2rem;
         margin-bottom: 0.2rem;
         background: #FFFFFF;
    .printTop{
        width: 5.28rem;
        margin-top: 0.16rem;
        font-size: 0.15rem;
        height: 0.24rem;
        color: #333333;
        line-height: 0.24rem;
        .printTitle{
            width: 0.48rem;
            color: #333333;
            float: left;
            margin-left: 0.2rem;
        }
        // .unAddPrint{
        //  text-align: center;
        //  color: #333333;
        //  font-weight: bold;
        // }
        .printType{
            float: left;
            margin-left: 0.06rem;
            width: 0.9rem;
            height: 0.24rem;
            line-height: 0.24rem;
            text-align: center;
            color: #C3C3C3;
            border: 1px solid #C3C3C3;
            border-radius: 0.04rem;
        }
        .breaking{
            background: #F3F3F3;
            width: 0.9rem;
            height: 0.24rem;
            float: left;
            border-radius: 0.04rem;
            text-align: center;
            margin-left: 0.06rem;
        }
        .printPage{
            float: left;
            margin-left: 0.16rem;
        }
        .pageContent{
            float: left;
            margin-left: 0.06rem;
            width: 1.46rem;
            height: 0.24rem;
            border: 1px solid #C3C3C3;
            border-radius: 0.04rem;
            text-align: center;
            color: #C3C3C3;
        }
        .check{
            float: left;
            display: block;
            width: 0.6rem;
            height: 0.24rem;
            border-radius: 0.04rem;
            text-align: center;
            line-height: 0.24rem;
            margin-left: 0.16rem;
            background: #F75745;
            color: white;
        }
    }
    .printQueue{
        width: 4.88rem;
        height: 0.34rem;
        margin: 0.1rem auto;
        background: #E9FDDF;
        color: #6BC43D;
        text-align: center;
        line-height: 0.34rem;
        border: 1px solid #BFEAAB;
    }
    .preview{
        width: 100%;
        // height: 540px;
        background: #FFFFFF;
        margin-top: 0.3rem;
        .previewDecs{
            width: 100%;
            font-size: 0.17rem;
            font-weight: bold;
            text-align: center;
        }
        .bg_PrintData::-webkit-scrollbar{
            width: 0;
        }
        .bg_PrintData::-webkit-scrollbar-thumb{
           background: #F75745;
           width: 0.04rem;
          }
        .bg_PrintData::-ms-scrollbar{
            width: 0;
        }
        .bg_PrintData::scrollbar{

        }
        .-ms-bg_PrintData{
            overflow:hidden;
          
        }
        .bg_PrintData{
            width: 4.88rem;
            height: 4.18rem;
            margin: 0.1rem auto;
            // border: 1px solid;
            overflow-y: scroll;
            overflow-x:hidden;//去除横向滚动条
            .unAddPrintImg{
                width:2.5rem;
                height: 1.9rem;
                display: block;
                margin: auto;
            }
            .printDetail{
                width: 4.88rem;
                div{
                    width: 3.9rem;
                    height: 0.3rem;
                    margin: 0.1rem auto;
                    font-size: 0.14rem;
                    span{
                        width: 1.13rem;
                        display: block;
                        float: left;
                        text-align: right;
                    }
                    select,input{
                        border: 1px solid #C3C3C3;
                        width: 2.5rem;
                        height: 0.3rem;
                        float: left;
                        margin-left: 0.12rem ;
                        outline: none;
                        box-sizing: border-box;
                    }
                    // input{

                    // }
                }
                .addPrint{
                    width:4.6rem;
                    height:0.36rem;
                    background: #F75745;
                    color: #FFFFFF;
                    text-align: center;
                    font-size: 0.14rem;
                }
            }
        }
        #PrintData{
          margin: auto !important;
          margin-top: 10px;
        }
    }
     }
 }
 .printStatus{
         width: 3.48rem;
         height: 2.58rem;
         background: #FFFFFF;
         position: fixed;
         top: 2.24rem;
         left:  5.46rem;
         box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
         display: none;
        .statusContent{
         width: 3.48rem;
         height: 2.1rem;
         font-size: 0.14rem;
         overflow: hidden;
         .statusTitle{
             width: 3.48rem;
             height: 0.15rem;
             text-align: center;
             margin: 0.2rem auto;
         }
         .loadingImg{
             width: 0.48rem;
             height: 0.08rem;
             display: block;
             margin: 0.3rem auto;
         }
         .state2Img{
             width: 0.4rem;
             height: 0.3rem;
             display: block;
             margin: 0.1rem auto;
         }
         .state3Img{
             width: 0.3rem;
             height: 0.3rem;
             display: block;
             margin: 0.2rem auto;
         }
         .printImg{
             width: 0.91rem;
             height: 0.91rem;
             display: block;
             margin: 0.1rem auto;
         }
         .printStatusSure{
             width: 3.48rem;
             height: 0.47rem;
             text-align: center;
             line-height: 0.47rem;
             background: white;
             position: absolute;
             bottom: 0;
             color: #F75745;
             border-top: 1px dashed #CCCCCC;
         }
        }
     }
</style>
