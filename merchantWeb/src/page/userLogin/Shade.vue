<template>
  <div class="shadeBox">
    <div class="shadeRemind">
      <p>当前游览器不能正常使用商户管理后台，建议您使用QQ游览器或360游览器进行访问。</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.shadeBox {
  width: 100%;
  height: 1160px;
  background-color: rgba(0, 0, 0, 0.4);
  // position: fixed;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  position: absolute;
  top: 0;
  .shadeRemind {
    position: fixed;
    width: 400px;
    height: 200px;
    background-color: #fff;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    font-size: 18px;
    padding: 10px;
    p {
      margin-top: 50px;
    text-align: center;
    line-height: 35px
    }
  }
}
</style>