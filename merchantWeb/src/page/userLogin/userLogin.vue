<template>
    <div class="userLogin">
    <shade v-if="showShade"/>
    <div class="top">
        <!-- 头部 -->

        <div class="topMid">
            <img src="../../assets/img/loginLogo.png" alt="" class="logo">
            <span class="line"></span>
            <p class="descLogin">用户登录</p>
        </div>
    </div>
    <div class="middle">
        <!-- 商户截图/登录区域 -->
        <div class="middleContent">
            <div class="middleLeft">
               <!-- <img src="" alt="" class="bcImg"> -->
            </div>
            <div class="middleRight" v-if="toLogin">
                <!-- 扫码登录 -->
               <p class="rightDesc" >
                   扫码登录
               </p>

               <img :src="imgUrl" alt="" class="loginImg" v-if="control">
               <img src="" alt="" class="loginImg" v-else @click=" refurbish">
               <p class="loginDesc" ref="loginDesc">
                   请使用商户或店员账号扫码登录
               </p>
               <div class="rightBottom" @click="changeLog">
                非本地玩用户点击切换
               </div>
            </div>
            <div class="middleRight" v-else>
                <!-- 选择登录渠道 -->
               <p class="rightDesc" >
                   渠道选择
               </p>
            <div class="localPlay" @click="toLocal">
               <img class="localImg" src="../../assets/img/loginLogo.png" alt="" >
               <p class="localTitle">本地玩</p>
            </div>
            <div class="xiangChengPlay" @click="toXiangCheng">
               <img class="xiangChengImg" src="../../assets/img/loginXiangCheng.png" alt="" >
               <p class="xiangChenTitle">香城玩</p>
            </div>

               <p class="loginDescElse" >
                   请使用商户或店员账号扫码登录
               </p>
               <div class="rightBottom" @click="changeLog">
                取消
               </div>
            </div>

        </div>
    </div>
    <foot></foot>
    </div>
</template>

<script>
import foot from '@/components/foot.vue';
import {merchantLogin,toMerchantLogin} from '../../service/getData'
import shade from "./Shade";

export default {
    data() {
        return {
            control: true,
            toLogin:true,
            imgUrl:'',
            channelId:"1045",
            timer: null,
            merchantLoginKey:'',
            flag: 0,
            showShade:false,
        }
    },
   components: {
     foot,
     shade,
   },
    methods: {
        refurbish(){
            alert('1')
        },
        toLocal(){
        this.toLogin=true;
        this.channelId='1045';
        this.readyLogin();
        },
        toXiangCheng(){
        this.toLogin=true
        this.channelId='1008';
        this.readyLogin();
        },
        changeLog(){
            this.toLogin=!this.toLogin;
        },
        readyLogin(){

             merchantLogin({channelId: this.channelId}).then(res =>{
             console.log(res);
             this.imgUrl=res.data.data.qrCodeUrl;
             this.merchantLoginKey=res.data.data.sessionId;
        })

        },
        isLogin(){
             this.timer=setInterval(()=>{
             merchantLogin({channelId: this.channelId,merchantLoginKey:this.merchantLoginKey}).then(res =>{
            console.log(res.data.code)
            if(res.data.code=='0'){
                if(res.data.data.loginStatus=='1'){
                    localStorage.token=res.data.data.token
                    localStorage.userId=res.data.data.userId;
                    sessionStorage.storeId=res.data.data.storeId;
                    //1
                    localStorage.channelId=this.channelId;
                    console.log(res)
                    this.$router.push({name:'orderList'})
                 }
                 console.log(1)
            }else{
                  this.$alert(res.data.message)
                  clearInterval(this.timer);
                  this.timer = null;
                  window.location.reload()
            }

        })
            },2000)
        },
        whetherLogin(){
            if(localStorage.token){
                this.$router.push({name:'orderList'})/*  */
            }
        },

          IEVersion() {// 判断ie版本 2020 04 30 --陈圣乐
            var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
            var isIE =
                userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
            var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
            var isIE11 =
                userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;
            if (isIE) {
                var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
                reIE.test(userAgent);
                var fIEVersion = parseFloat(RegExp["$1"]);
                if (fIEVersion == 7) {
                return 7;
                } else if (fIEVersion == 8) {
                return 8;
                } else if (fIEVersion == 9) {
                return 9;
                } else if (fIEVersion == 10) {
                return 10;
                } else {
                return 6; //IE版本<=7
                }
            } else if (isEdge) {
                return "edge"; //edge
            } else if (isIE11) {
                return 11; //IE11
            } else {
                return 12; //不是ie浏览器
            }
            }

    },

    mounted() {
        // this.readyLogin();
        // this.isLogin();
        // this.whetherLogin();
        
         //判读ie浏览器版本低于10就提示升级浏览器 
    this.flag = this.IEVersion();
    if (this.flag < 10) {
        this.showShade=true;
        console.log('低于ie10')
    } else {
      this.readyLogin();
      this.isLogin();
      this.whetherLogin();
      console.log('ie内核'+ this.flag)
    }// 2020 04 30 --陈圣乐
        // this.$axios.get('https://alpha-push.fpwan.com/api/store/login',{params:{channelId:'1045'}}).then(res =>{
        //     console.log(res)
        // })
    },
    beforeDestroy() {
         clearInterval(this.timer);
            this.timer = null;
    },
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
     }
 }
 .middle{
     overflow: hidden;
     width: 100%;
     height: 5.42rem;
     background: url('../../assets/img/loginBg.png');
     background-size: 100% 5.42rem;
         .middleLeft{
             width: 5.8rem;
             height: 3.35rem;
             float: left;
             margin-left: 2.2rem;
             margin-top: 1.04rem;
            //  .bcImg{
            //   width: 5.8rem;
            //  height: 3.35rem;
            //  display: block;
            //  border: 1px solid grey;
            //  }
         }
         .middleRight{
             width: 3.16rem;
             height: 3.84rem;
             background: white;
             float: left;
             margin-left: 0.79rem;
             margin-top: 0.79rem;
             .rightDesc{
             width: 100%;
             margin-top: 0.5rem;
             text-align: center;
             font-size: 0.14rem;
            }
            .loginImg{
             display: block;
             width: 1.83rem;
             height: 1.83rem;
             margin: auto;
             margin-top: 0.2rem;
           }
           .loginDesc{
               margin-top: 0.15rem;
               width: 100%;
               text-align: center;
               font-size: 0.12rem;
           }
           .localPlay{
            width: 1.44rem;
            margin: auto;
            margin-top: 0.3rem;
            height: 0.52rem;
            border-bottom: 1px solid #F3F3F3;
            .localImg{
             display: block;
             float: left;
             width: 0.28rem;
             height: 0.28rem;
             margin-left: 0.3rem;
            }
            .localTitle{
                font-size: 0.14rem;
                float: left;
                margin-left: 0.12rem;
                line-height: 0.28rem;
            }
           }
           .xiangChengPlay{
            width: 1.44rem;
            margin: auto;
            margin-top: 0.11rem;
            height: 0.52rem;
            .xiangChengImg{
             display: block;
             float: left;
             width: 0.28rem;
             height: 0.28rem;
             margin-left: 0.3rem;
            }
            .xiangChenTitle{
            font-size: 0.14rem;
            float: left;
            margin-left: 0.12rem;
            line-height: 0.28rem;
            }
           }
           .loginDescElse{
            margin-top: 0.76rem;
            width: 100%;
            text-align: center;
            font-size: 0.12rem;
           }
           .rightBottom{
               width: 100%;
               height: 0.48rem;
               font-size: 0.14rem;
               color: #F75745;
               text-align: center;
               line-height: 0.48rem;
               margin-top: 0.2rem;
               border-top:2px dashed #CCCCCC ;
           }
           }


 }

</style>
