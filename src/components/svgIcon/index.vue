
<template>
  <svg :class="svgClass" aria-hidden="true">
    <use xlink:href="#icon-主页"></use>
  </svg>
</template>


<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
  iconClass: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ''
  }
});
console.log(props,'进入');
// 图标在 iconfont 中的名字
// const iconName = computed(()=>{
//   return props.iconClass ? `#icon-${props.iconClass}` : "#icon";
// })
// 给图标添加上类名
const svgClass = computed(() => {
  return props.className ? "svg-icon " + props.className : "svg-icon";
});
</script>


<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
