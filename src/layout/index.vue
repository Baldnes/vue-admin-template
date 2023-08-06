<template>
  <div class="layout_container">
    <!--左侧菜单-->
    <div class="layout_clider">
      <logo></logo>
      <el-scrollbar class="scrollbar">
        <!--菜单-->
        <el-menu
          text-color="white"
          :collapse="LayOutSettingStore.fold ? true : false"
          background-color="#7ac5d8"
          active-text-color="yellow"
          :default-active="$route.path"
        >
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!--顶部导航-->
    <div
      class="layout_tabber"
      :class="{ fold: LayOutSettingStore.fold ? true : false }"
    >
      <tabber></tabber>
    </div>
    <!--内容展示-->
    <div
      class="layout_main"
      :class="{ fold: LayOutSettingStore.fold ? true : false }"
    >
      <Main />
    </div>
  </div>
</template>
<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting.ts'
import logo from './logo/index.vue'
import Menu from './menu/index.vue'
import useUserStore from '@/store/modules/user.ts'
import Main from './main/index.vue'
import { useRoute } from 'vue-router'
import tabber from './tabber/index.vue'
let userStore = useUserStore()
let $route = useRoute()
let LayOutSettingStore = useLayOutSettingStore()
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_clider {
    width: $base-menu-width;
    height: 100vh;
    background-image: linear-gradient(
      to bottom,
      #7ac5d8 0%,
      #bbc1bf 19%,
      #57c6e1 42%,
      #b49fda 79%,
      #7ac5d8 100%
    );
    transition: all 0.3s;
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
      .el-menu {
        border-right: none;
      }
    }
  }

  .layout_tabber {
    width: calc(100% - $base-menu-width);
    height: $base-tabber-height;
    position: fixed;
    top: 0;
    left: $base-menu-width;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      position: fixed;
      top: 0;
      left: $base-menu-min-width;
    }
  }

  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabber-height);
    background: white;
    left: $base-menu-width;
    top: $base-tabber-height;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      position: absolute;
      top: $base-tabber-height;
      left: $base-menu-min-width;
    }
  }
}
</style>
