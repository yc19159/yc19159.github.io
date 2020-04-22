<template>
   <div class="orderList">
    <div class="top">
        <!-- 头部 -->
        <div class="topMid">
                <img src="../../assets/img/loginLogo.png" alt="" class="logo">
                <span class="line"></span>
                <p class="descLogin">商户系统</p>
       
            <div class="topRight">
                 <span class="quota">本月营业额:  </span><span :style="{'cloor':'#F75745','float':'left'}">{{100}}</span>
                 <span class="orderNum">本月订单数:</span><span :style="{'cloor':'#F75745','float':'left'}">{{100}}</span>
                 <div class="statusCtrl">
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
                <el-tab-pane label="新订单" name="first">
                    <div class="newOrder clearfix">
                        <div class="clearfix orderDetail">
                            <!-- 订单详情 -->
                            <div class="newOrderLeft clearfix">
                                <div :style="{'width':'2.33rem'}" class="clearfix">
                                        <p class="number">9号</p>
                                        <p class="takeOut">外卖订单</p>
                                        <p class="time">2020-02-02 12:22</p>
                                    </div>
                                <div class="kehu">
                                    <span class="kehuName">曹先生</span>
                                    <span class="kehuMobile">13227772222</span>
                                    <span class="distance">9km</span>
                                    <p class="address">虎成广场秀康面馆旁 虎成街一号</p>
                                </div>
                                <div class="fee">
                                    <span class="distributeFee">配送费：¥7</span>
                                    <p class="actualFee">顾客实付金额：¥17</p>
                                </div>            
                                    <div class="distribute">
                                            <button class="zjDis">自己配送</button>
                                            <button class="ptDis">平台配送</button>
                                            <button class="printOrder">打印订单</button>
                                           
                                    </div>
                            </div>
                            <div class="neworderRight clearfix">
                                <div class="orderInfo">
                                    <img src="" alt="图片" class="goodsImg">
                                    <p class="goodsName">秀康面馆超值套餐值套餐</p>
                                    <p class="goodsNum">X1</p>
                                    <p class="goodsPrice">¥9.99</p>
                                </div>
                                
                            </div>
                       </div>
                     
                    </div>
                     
                    <button class="batchPrint" @click="batchPrint" ref="batchPrintButton">批量打印</button>
                     <div class="sureOrCancle" ref="sureOrCancle">
                        <button class="sure" @click="surePrint">确认打印</button>
                        <button class="cancle" @click="cancleBatchPrint">取消批量打印</button>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="待配送" name="second">配置管理</el-tab-pane>
                <el-tab-pane label="配送中" name="third">角色管理</el-tab-pane>
                <el-tab-pane label="已完成" name="fourth">定时任务补偿</el-tab-pane>
                
            </el-tabs>
            <div class="print">
                <div class="printTop" v-if="state==1">
                        <p class="printTitle">打印机</p>
                        <p class="printType">XP-58</p>
                        <p class="printPage">打印支持纸张</p>
                        <p class="pageContent">P5000X20000</p>
                        <button class="check">检查</button>
                </div>
                <div class="printTop" v-if="state==2">
                        <p class="printTitle">打印机</p>
                        <p class="breaking">已断开</p>

                </div>
                <div class="printStatus">打印任务进行中，共打印10条，正在打印第一条</div>
                <div class="preview clearfix">
                        <p class="previewDecs">对账单预览</p>
                        <div class="bg_PrintData">
                        <div id="PrintData" :style="{'border':'1px dashed red' ,'text-align':'center','padding':'0px','width':'80%','margin': '0px'}"></div>
                        <!-- <div id="PrintData" :style="{'border' : '1px dashed red','text-align':'center','padding':'0px','width':'232px'}"></div> -->
                        </div>
                </div>
        </div>
        </div>
       

    </div>
    <foot></foot>
    </div>
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.js" type="text/javascript"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js" type="text/javascript"></script>

<script>

import foot from '@/components/foot.vue';
export default {
    data() {
        return {
            activeName: 'first',
            state: 1,
        }
    },
    components:{
        foot
    },
    methods: {
         handleClick(tab, event) {
           console.log(tab, event);
          } ,
          batchPrint(){
              this.$refs.batchPrintButton.style.display='none';
              this.$refs.sureOrCancle.style.display='block';
          },
          cancleBatchPrint(){
              this.$refs.batchPrintButton.style.display='block';
              this.$refs.sureOrCancle.style.display='none';
          },
          surePrint(){
              alert('1')
          }
        }
}
</script>

<style lang="scss" scoped>
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
                margin-left: 1.6rem;
                .close{
                    width: 0.2rem;
                    height: 0.2rem;
                    display: block;
                    float: left;
                }
                .logout{
                    float: left;
                    margin-left: 0.12rem;
                    height: 0.28rem;  
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
               padding-bottom: 0.1rem;
               background: #FFFFFF;
           }
      }
      .newOrder{
          width: 6.04rem;
          overflow: hidden;
          margin-top: 0.1rem;
          background: #FFF5F4;
          font-size: 0.14rem;
          margin-left: 0.16rem;
          color: #666666;

          .newOrderLeft{
        //   width: 240px;
          width: 2.43rem;
          padding-left: 0.1rem;
          margin-top: 0.15rem;
          float: left;
          border-right: 2px dashed #CECECE;
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
          .neworderRight{
              width: 3.6rem;
              float: left;
              .orderInfo{
                  width: 3.37rem;
                  height: 0.32rem;
                  margin-top: 0.2rem;
                  margin-left: 0.2rem;
                  .goodsImg{
                      width: 0.32rem;
                      height: 0.32rem;
                      display: block;
                      float: left;
                      border: 1px solid grey;
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
                      margin-left: 0.8rem;
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
              margin-top: 0.2rem;
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
      }
      .sureOrCancle{
          margin-top:  0.1rem;
          display: none;
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
       
     }
     .print{
         width: 5.28rem;
        //  height: 600px;
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
        font-size: 0.16rem;
        height: 0.24rem;
        color: #333333;
        line-height: 0.24rem;
        .printTitle{
            width: 0.48rem;
            color: #333333;
            float: left;
            margin-left: 0.2rem;
        }
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
    .printStatus{
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
        background: #FDFDFD;
        margin-top: 10px;
        .previewDecs{
            width: 100%;
            font-size: 0.17rem;
            font-weight: bold;
            text-align: center;
        }
        .bg_PrintData{
            width: 4.88rem;
            height: 4.18rem;
            margin: 0.1rem auto;
            border: 1px solid;
        }
        #PrintData{
          margin: auto !important;
          margin-top: 10px;
        }
    }
     }
 }
</style>