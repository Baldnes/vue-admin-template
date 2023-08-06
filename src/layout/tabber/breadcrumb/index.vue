<template>
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is='fold ? "Expand" : "Fold"'></component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="(item,index) in $route.matched" :key="index"  v-show="item.meta.title" :to="item.path">
      <span>{{item.meta.title}}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>

</template>
<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting.ts'
import {useRoute} from 'vue-router'

let $route = useRoute()
let LayOutSettingStore = useLayOutSettingStore()
const changeIcon = () => {
  LayOutSettingStore.fold = !LayOutSettingStore.fold
}
</script>

<style scoped lang="scss">

</style>