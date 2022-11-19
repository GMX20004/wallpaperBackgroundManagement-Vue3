<template>
  <div class="intro">
    <svg viewBox="0 0 800 600">
      <symbol id="s-text">
        <text text-anchor="middle" x="50%" y="68%" class="text--line2">GXM</text>
      </symbol>
      <g class="g-ants">
        <use xlink:href="#s-text" class="text-copy"></use>
        <use xlink:href="#s-text" class="text-copy"></use>
        <use xlink:href="#s-text" class="text-copy"></use>
        <use xlink:href="#s-text" class="text-copy"></use>
        <use xlink:href="#s-text" class="text-copy"></use>
      </g>
    </svg>
    <div style="position: absolute;bottom: 10px;width: 100%;">
      <el-divider id="progressCom" style="width: 1%;" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
interface timeInterface{
  progressTime: any,
  progressNum: number
}
const emit = defineEmits(['state']);
const time = reactive<timeInterface>({
  progressTime: null,
  progressNum: 0
})
onMounted(()=>{
  time.progressTime = setInterval(()=>{
    time.progressNum+=0.1;
    let html = document.getElementById('progressCom');
    if (html !== null){
      html.style.width = time.progressNum + '%';
    }
    if (time.progressNum > 99.5){
      clearInterval(time.progressTime);
      emit('state',0);
    }
  },10);
})
</script>

<style scoped lang="scss">
  .intro{
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: black;
  z-index: 99;
  $colors: #360745, #D61C59, #E7D84B, #EFEAC5, #1B8798;
  svg {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  $max: 5;
  $stroke-step: 7%;
  .text-copy {
    font-size: 300px;
    fill: none;
    stroke: white;
    stroke-dasharray: $stroke-step $stroke-step * ($max - 1);
    stroke-width: 3px;
    animation: stroke-offset 9s infinite linear;
    @for $item from 1 through $max {
      $stroke-color: nth($colors, $item);
      &:nth-child(#{$item}) {
        stroke: $stroke-color;
        stroke-dashoffset: $stroke-step * $item;
      }
    }
  }
  @keyframes stroke-offset {
    50% {
      stroke-dashoffset: $stroke-step * $max;
      stroke-dasharray: 0 $stroke-step * $max*2.5;
    }
  }
}
</style>
