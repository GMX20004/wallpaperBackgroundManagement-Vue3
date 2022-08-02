<template>
  <div class="setUp">
    <perfect-scrollbar>
      <el-button style="width: 100px;margin-left: 50px" type="danger" round @click="exitClick">{{language===1?'Exit':'退出'}}</el-button>
    </perfect-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted } from "vue";
import router from "@/router";

/**
 * 变量区
 */
// 公共
const proxy = inject("proxy");
const { $cookies } = proxy as any;
let language:any = inject('language');
const modifyIsLogTo:any = inject('modifyIsLogTo');
/**
 * 方法区
 */
const exitClick = () => {
  $cookies.remove('uuid');
  modifyIsLogTo(false);
  router.push({
    'path': '/'
  });
}
/**
 * 初始化
 */
onMounted(()=>{
  if ($cookies.get('uuid')===null){
    modifyIsLogTo(false);
  }
});
</script>

<style scoped lang="scss">
.setUp{
  width: 100%;
  height: 100%;
  .ps{
    width: 100%;
    height: 100%;
  }
}
</style>
