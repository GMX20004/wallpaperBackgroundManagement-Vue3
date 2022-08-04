import { createApp } from "vue";
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import axios from 'axios';
import * as echarts from 'echarts';
import VueCookies from 'vue-cookies';
import '@/assets/imgs';
import vue3SeamlessScroll from "vue3-seamless-scroll";
import PerfectScrollbar from 'vue3-perfect-scrollbar';
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css';
axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://101.43.88.137:9081';
const imgUrl = 'http://101.43.88.137:9081/image/';
const app = createApp(App);
app.use(vue3SeamlessScroll);
app.use(PerfectScrollbar);
app.config.globalProperties.$cookies  = VueCookies;
app.config.globalProperties.$echarts = echarts;
app.config.globalProperties.$http = axios;
app.config.globalProperties.$imgUrl = imgUrl;
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(store);
app.use(router);
app.mount('#app');
