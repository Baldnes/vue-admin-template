<script setup lang="ts">
import router from "@/router";
const send = ()=>{
  router.push({
    path:"/"
  })
}
</script>

<template>
  <div class="box">
    <div class="design">
      <div class="img">
        <img src="@/assets/image/404.png" alt="">
      </div>
      <div class="title">
        <h1>404</h1>
        <h2>UH OH！页面丢失</h2>
        <div class="txt">
          <span>您所寻找的页面不存在，你可以点击下面的按钮，返回首页</span>
        </div>
        <div class="btn">
          <el-button type="success" text @click="send">返回首页</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.box {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  .design {
    width: 65%;
    display: flex;
    img {
      width: 400px;
      height: 300px;
    }
    .title {
      margin-left: 20px;
      display:flex;
      flex-direction: column;
    }
  }
}
h1 {
  font-size: 150px;
  font-weight: bolder;
}
h2 {
  font-size: 50px;
}
.txt {
  font-size: 20px;
  margin-top: 15px;
}
.btn {
  margin-top: 15px;
}
</style>
