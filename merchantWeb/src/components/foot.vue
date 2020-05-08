<template>
       <footer class="foot">
             <div class="footLeft">
                 <p class="kefu"><span :style="{'font-size':'14px'}"> 客服电话</span>：18727826466</p>
                 <p class="beian">鄂ICP备17009451号-24 · 鄂公网安备 42120202000205号</p>
             </div>
             <div class="footRight">
                 <!-- <div :style="{'float':'left'}">
                 <p class="down">下载app</p>
                 <img src="" alt="" class="appEwm">
                 </div> -->
                 <div :style="{'float':'left','margin-left':'0.75rem'}">
                 <p class="down">关注公众号 </p>
                 <img src="../assets/img/loginGzh.jpg" alt="" class="gzhEwm">
                 </div>
             </div>
       </footer>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.foot{
     width: 14.4rem;
     height: 1.68rem;
     overflow: hidden;
     font-size: 0.12rem;
     color: #333333;
     .footLeft{
       float: left;
       margin-left: 2.2rem;
       margin-top: 0.84rem;
       .beian{
           margin-top: 0.16rem;
           color: #333333;
       }
     }
     .footRight{
         float: right;
         margin-top: 0.35rem;
         margin-right: 2.45rem;
         .down{
            width: 0.8rem;
            text-align: center;
         }
         .appEwm{
             display: block;
             width: 0.75rem;
             height: 0.75rem;
             border: 1px solid grey;
             margin-top: 0.04rem;
         }
         .gzhEwm {
             display: block;
             width: 0.75rem;
             height: 0.75rem;
             border: 1px solid grey;
             margin-top: 0.04rem;
         }
     }
 }
</style>
