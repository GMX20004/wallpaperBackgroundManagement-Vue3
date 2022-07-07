import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import axios from 'axios';
import svgIcon from './components/svgIcon/index.vue';
import * as echarts from 'echarts';
import VueCookies from 'vue-cookies'
import '@/assets/imgs';
axios.defaults.headers.common['token'] = '';
axios.defaults.headers.post['Content-type'] = 'application/json';
axios.defaults.baseURL = 'http://101.43.88.137';
const imgUrl = 'http://101.43.88.137/image/';
const app = createApp(App);
app.component('SvgIcon',svgIcon);
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
