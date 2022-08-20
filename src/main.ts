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
import fileDownload from "js-file-download";
axios.defaults.timeout = 60000;
axios.defaults.baseURL = 'http://101.43.88.137:9081';
const imgUrl = 'http://101.43.88.137:9081/image/';
const app = createApp(App);
app.config.globalProperties.$cookies  = VueCookies;
app.config.globalProperties.$echarts = echarts;
app.config.globalProperties.$http = axios;
app.config.globalProperties.$imgUrl = imgUrl;
app.config.globalProperties.$file = fileDownload;
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(store);
app.use(router);
app.mount('#app');
