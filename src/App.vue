<template>
  <router-view />
</template>
<script setup lang="ts">
import { getCurrentInstance, provide } from "vue";
const { proxy } = getCurrentInstance() as any;
provide('proxy',proxy);
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 0px;
  height: 100%;
  width: 100%;
  position:fixed;
  overflow: auto;
}
[v-cloak]{
  display: none;
}
</style>
