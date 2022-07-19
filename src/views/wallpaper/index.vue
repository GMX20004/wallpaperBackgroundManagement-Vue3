<template>
  <div class="message">
    <el-button @click="button">点击</el-button>
    <public ref="publicInterface"></public>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import Public from "@/views/public.vue";
let language:any = inject('language');
const increment:any = inject('increment');
const button = () => {
  increment(language.value+1);
}
</script>

<style scoped lang="scss">
.message{
  width: 100%;
  height: 100%;
}
</style>

