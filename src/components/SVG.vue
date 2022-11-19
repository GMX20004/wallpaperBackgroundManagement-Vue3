<template>
  <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" :t="svgList[props.name].svg['t']" :p-id="svgList[props.name].svg['pid']" :width="props.size" :height="props.size">
    <path v-for="(item,i) in svgList[props.name].path" :key="i" :d="item['d']" :p-id="item['pid']" :fill="props.color"/>
  </svg>
</template>

<script setup lang="ts">
import { svgList } from "@/assets/ts/svgList";
const props = withDefaults(defineProps<{
  name: string,
  size?: number,
  color?: string,
  cursor?: string
}>(),{
  size: 30,
  color: '#000',
  cursor: 'default'
})
</script>
