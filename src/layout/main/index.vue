<template>
  <div>
    <!-- 路由组件出口的位置 -->
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <!-- 渲染layout一级路由组件的子路由 -->
        <component :is="Component" v-if="flag" />
      </transition>
    </router-view>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import useLayOutSettingStore from '@/store/modules/setting.ts'
let LayOutSettingStore = useLayOutSettingStore()
//控制组件是否需要销毁重建
let flag = ref(true)
// 监听是否需要刷新
watch(
  () => LayOutSettingStore.refsh,
  () => {
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all 0.3s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
