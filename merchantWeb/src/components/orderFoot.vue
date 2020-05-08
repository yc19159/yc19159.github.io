<template>
       <div class="foot">
             <div class="footTop">
                 <ul class="footUl">
                     <li>关于我们</li>
                     <li>法律声明</li>
                     <li>合作商户</li>
                     <li>帮助中心</li>
                 </ul>
                 <p class="kefumobile">客服电话:18727826466</p>
             </div>
             <div class="footBottom">
                <p class="beiAn">鄂ICP备17009451号-24 · 鄂公网安备 42120202000205号</p>
             </div>
       </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.foot{
     width: 14.4rem;
     height: 1.12rem;
     overflow: hidden;
     color: #333333;
     font-size: 0.14rem;
     .footTop{
         width: 6.28rem;
         height: 0.14rem;
         margin: auto;
         margin-top: 0.32rem;
         text-align: center;
         line-height: 0.14rem;
         .footUl{
             width: 4.12rem;
           
             float: left;
             li{ 
                 width: 1.02rem;
                 height: 0.14rem;
                 float: left;
                 border-right: 1px solid #CECECE;
             }
         }
         .kefumobile{
             float: left;
             margin-left: 0.24rem;
         }
     }
     .footBottom{
      width: 3.63rem;
      margin: auto;
      margin-top: 0.18rem;
      .beiAn{
          width: 3.76rem;
      }
     }
 }
</style>