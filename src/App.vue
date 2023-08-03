<template>
  <div class="box">
    <el-button type="primary">123</el-button>
<!--    <el-button type="success" :icon="Check" circle />-->
    <div class="demo-pagination-block">
      <div class="demonstration">Total item count</div>
      <el-pagination :page-size="100" :total="1000" />
    </div>
  </div>
</template>
<script lang="ts" setup>
// import { Check } from '@element-plus/icons-vue'
</script>
<style scoped lang="scss">
.box {
  width: 200px;
  height: 210px;
  h1 {
    width: 100px;
  }
}
</style>
