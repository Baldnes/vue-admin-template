<template>
  <el-button
    type="primary"
    size="small"
    circle
    color="white"
    @click="sendGitee"
  >
    <svg-icon name="gitee"></svg-icon>
  </el-button>
  <el-button
    type="primary"
    size="small"
    circle
    color="white"
    @click="sendGithub"
  >
    <svg-icon name="github"></svg-icon>
  </el-button>
  <el-button
    type="primary"
    size="small"
    icon="Refresh"
    circle
    color="white"
    @click="updateRefsh"
  ></el-button>
  <el-button
    type="primary"
    size="small"
    icon="FullScreen"
    circle
    color="white"
    @click="fullScreen"
  ></el-button>
  <el-button
    type="primary"
    size="small"
    icon="MoonNight"
    circle
    color="white"
    @click="handleChangeDark"
  ></el-button>
  <img
    :src="userStore.avatar"
    alt=""
    style="width: 24px; height: 24px; margin: 0 10px; border-radius: 100px"
  />
  <el-dropdown>
    <span class="el-dropdown-link">
      <span>{{ userStore.username }}</span>
      <el-icon class="el-icon--right" style="position: relative; top: 2px">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登陆</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting.ts'
import useUserStore from '@/store/modules/user.ts'
import { useRoute, useRouter } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'
// 切换
const isDark = useDark()
const toggleDark = useToggle(isDark)
// 切换
const handleChangeDark = () => {
  toggleDark()
}
let userStore = useUserStore()
let LayOutSettingStore = useLayOutSettingStore()
let $router = useRouter()
let $route = useRoute()
//刷新
const updateRefsh = () => {
  LayOutSettingStore.refsh = !LayOutSettingStore.refsh
}
// 全屏
const fullScreen = () => {
  let full = document.fullscreenElement
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
//退出登陆
const logout = async () => {
  //清空仓库关于用户的信息
  await userStore.userLogout()
  $router.push({
    path: '/login',
    query: { redirect: $route.path },
  })
}
const sendGitee = () => {
  window.open('https://gitee.com/wang_-chunyang/vue-admin-template', '_blank')
}
const sendGithub = () => {
  window.open('https://github.com/Baldnes/vue-admin-template', '_blank')
}
</script>

<style scoped lang="scss"></style>
