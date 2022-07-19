<script setup lang="ts">
/**
 * 类型定义
 */
// interface Props{
//
// }

import { ref } from "vue";

/**
 * 变量区
 */

// const props = withDefaults(defineProps<Props>(), {
//
// });
const cc = ref<number>(0);
const emit = defineEmits(['homePage']);
/**
 * 方法区
 */
const home = () => {
  emit('homePage');
  console.log('执行homePage');
}
defineExpose({
  cc,
  home
})
</script>
