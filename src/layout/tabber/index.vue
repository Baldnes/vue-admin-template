<template>
  <div class="tabber">
    <div class="tabber_left">
      <breadcrumb />
    </div>
    <div class="tabber_right">
      <setting />
    </div>
  </div>
</template>

<script setup lang="ts">
import breadcrumb from './breadcrumb/index.vue'
import setting from './setting/index.vue'
</script>

<style scoped lang="scss">
.tabber {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  background-image: linear-gradient(to right, #fff1eb 0%, #ace0f9 100%);
  .tabber_left {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }

  .tabber_right {
    display: flex;
    align-items: center;
  }
}
</style>
