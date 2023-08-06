<template>
  <img :src="userStore.avatar" alt="">
</template>
<script lang="ts" setup>
import useUserStore from "@/store/modules/user.ts";
let userStore = useUserStore()

</script>

<style scoped lang="scss"></style>
