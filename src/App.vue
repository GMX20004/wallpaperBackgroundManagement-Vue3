<template>
  <div id="app">
    <perfect-scrollbar>
      <keep-alive>
        <router-view class="content" v-if="$route.meta.keepAlive" />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive || isRouterActive"></router-view>
    </perfect-scrollbar>
  </div>
</template>
<script setup lang="ts">
import { getCurrentInstance, nextTick, provide, ref } from "vue";
const { proxy } = getCurrentInstance() as any;
const isRouterActive = ref(true);
provide('proxy',proxy);

provide('reload', () => {
  isRouterActive.value = false
  nextTick(() => {
    isRouterActive.value = true
  })
})
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 0px;
  height: 100%;
  width: 100%;
  position: absolute;
  .ps{
    height: 100%;
  }
}
</style>
