<template>
    <div class="userLogin">
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
               <img src="" alt="" class="bcImg">
            </div>
            <div class="middleRight" v-if="toLogin">
                <!-- 扫码登录 -->
               <p class="rightDesc" >
                   扫码登录
               </p>

               <img src="" alt="" class="loginImg" v-if="control">
               <img src="" alt="" class="loginImg" v-else @click=" refurbish">
               <p class="loginDesc">
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
            <div class="localPlay" @click="toLog">
               <img class="localImg" src="../../assets/img/loginLogo.png" alt="" >
               <p class="localTitle">本地玩</p>
            </div>
            <div class="xiangChengPlay" @click="toLog">
               <img class="xiangChengImg" src="../../assets/img/loginXiangCheng.png" alt="" >
               <p class="xiangChenTitle">本地玩</p>
            </div>
             
               <p class="loginDescElse">
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
import foot from '@/components/foot.vue'
export default {
    data() {
        return {
            control: false,
            toLogin:true,
        }
    },
   components: {
     foot,
   },
    methods: {
        refurbish(){
            alert('1')
        },
        toLog(){
        this.toLogin=true
        console.log(this.toLogin)
        },
        changeLog(){
            this.toLogin=!this.toLogin;
        }
    },
    
    mounted() {
        
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
             .bcImg{
              width: 5.8rem;
             height: 3.35rem; 
             display: block;
             border: 1px solid grey;
             }
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
             border: 1px solid slategray;
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