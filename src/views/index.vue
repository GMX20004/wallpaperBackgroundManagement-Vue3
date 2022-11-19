<template>
  <div v-if="framework.isPc" class="background" :style="{'height':framework.height,'width':framework.width}" :class="framework.dialogClass?'main-dialog':''">
    <!-- 开头加载动画 -->
    <loading-page v-if="framework.state===-1" :style="{'height':framework.height,'width':framework.width}" @state="stateChange"></loading-page>
    <!-- 背景视频 -->
    <video class="background-video" :style="{'height':framework.height,'width':framework.width}" autoplay loop muted>
      <source :src="$otherUrl+'video/btrrd.mp4'" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <!-- 阴影 -->
    <div v-if="!store.state['displayMode']" style="position: absolute;top: 0;background-color: #fff;opacity:0.6;" :style="{'height':framework.height,'width':framework.width}" />
    <!-- 显示页面 -->
    <div v-if="framework.state===1" class="system" :style="{'background-color':store.state['displayMode']?'#000':'#eff2f7'}" >
      <!-- 左侧导航栏 -->
      <span class="menu">
        <div style="width: 100%;margin-top: 100%;">
          <div class="menu-button" v-for="(item,i) in navigation.list" :key="i" @click="Click(i)" :class="navigation.options===i?framework.color3:''">
            <SVG :name="item" :color="navigation.options===i?framework.color1:framework.color2"></SVG>
          </div>
        </div>
      </span>
      <!-- 页面内容展示 -->
      <span class="window" :style="{'background-color':store.state['displayMode']?'#545454':'#fff'}" >
        <div class="accordingWindow">
          <el-config-provider :locale="store.state['language']===1?en:zhCn">
            <router-view v-slot="{ Component }" v-show="$route.meta['keepAlive']">
              <keep-alive>
                <component :is="Component"/>
              </keep-alive>
            </router-view>
            <router-view v-if="!$route.meta['keepAlive']" />
          </el-config-provider>
        </div>
      </span>
    </div>
    <!-- 登录页面 -->
    <log-in
      v-else-if="framework.state===0"
      class="system"
      @state="stateChange"
      @options="optionsChange"
      @cycle="uuidCheck"
      :style="{'background-image': 'url('+$otherUrl+'system/LoginInterface.jpg'+')'}" />
    <!-- 显示模式切换 -->
    <div
      @click="displayMode"
      class="displayMode"
      :style="{'left': framework.nightMode.left,'top': framework.nightMode.top,'background-color':store.state['displayMode']?'#000':'#fff'}">
      <svg v-if="!store.state['displayMode']" style="margin: auto;" t="1660828193838" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5455" width="20" height="20">
        <path d="M501.48 493.55m-233.03 0a233.03 233.03 0 1 0 466.06 0 233.03 233.03 0 1 0-466.06 0Z" fill="#F9C626" p-id="5456"></path>
        <path d="M501.52 185.35H478.9c-8.28 0-15-6.72-15-15V87.59c0-8.28 6.72-15 15-15h22.62c8.28 0 15 6.72 15 15v82.76c0 8.28-6.72 15-15 15zM281.37 262.76l-16 16c-5.86 5.86-15.36 5.86-21.21 0l-58.52-58.52c-5.86-5.86-5.86-15.36 0-21.21l16-16c5.86-5.86 15.36-5.86 21.21 0l58.52 58.52c5.86 5.86 5.86 15.35 0 21.21zM185.76 478.48v22.62c0 8.28-6.72 15-15 15H88c-8.28 0-15-6.72-15-15v-22.62c0-8.28 6.72-15 15-15h82.76c8.28 0 15 6.72 15 15zM270.69 698.63l16 16c5.86 5.86 5.86 15.36 0 21.21l-58.52 58.52c-5.86 5.86-15.36 5.86-21.21 0l-16-16c-5.86-5.86-5.86-15.36 0-21.21l58.52-58.52c5.85-5.86 15.35-5.86 21.21 0zM486.41 794.24h22.62c8.28 0 15 6.72 15 15V892c0 8.28-6.72 15-15 15h-22.62c-8.28 0-15-6.72-15-15v-82.76c0-8.28 6.72-15 15-15zM706.56 709.31l16-16c5.86-5.86 15.36-5.86 21.21 0l58.52 58.52c5.86 5.86 5.86 15.36 0 21.21l-16 16c-5.86 5.86-15.36 5.86-21.21 0l-58.52-58.52c-5.86-5.85-5.86-15.35 0-21.21zM802.17 493.59v-22.62c0-8.28 6.72-15 15-15h82.76c8.28 0 15 6.72 15 15v22.62c0 8.28-6.72 15-15 15h-82.76c-8.28 0-15-6.72-15-15zM717.24 273.44l-16-16c-5.86-5.86-5.86-15.36 0-21.21l58.52-58.52c5.86-5.86 15.36-5.86 21.21 0l16 16c5.86 5.86 5.86 15.36 0 21.21l-58.52 58.52c-5.86 5.86-15.35 5.86-21.21 0z" fill="#F9C626" p-id="5457"></path>
      </svg>
      <svg v-else style="margin: auto;" t="1660828270819" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10595" width="20" height="20">
        <path d="M466.2784 386.048c-41.9328-115.2-35.0208-236.288 10.0864-340.5312A462.4896 462.4896 0 0 0 397.6704 66.56C158.5152 153.6 35.2256 418.048 122.2656 657.2032s351.488 362.4448 590.592 275.4048c123.9552-45.1072 216.7296-137.8816 265.3184-250.0608-215.8592 37.7856-434.3296-83.3536-511.8976-296.4992z" fill="#f4ea2a" p-id="10596"></path>
      </svg>
    </div>
  </div>
  <!-- 移动端 -->
  <div v-else style="width: 100%;height: 100%;text-align: center;padding-top: 30px;font-size: 20px">
    <b style="color: #2c95d4" @click="framework.isPc=!framework.isPc">页面暂不适配移动端，点我强行访问</b>
  </div>
</template>
<script setup lang="ts">
import { inject, onMounted, provide, reactive } from "vue";
import { useRouter } from "vue-router";
import zhCn from "element-plus/lib/locale/lang/zh-cn"
import en from 'element-plus/lib/locale/lang/en';
import { ElMessage } from "element-plus";
import { useStore } from  "vuex";
import SVG from "@/components/SVG.vue";
import LoadingPage from "@/views/framework/loadingPage.vue";
import LogIn from "@/views/framework/logIn.vue";
/**
 * 接口区
 */
interface navigationInterface{
  options: number,
  list:string[]
}
interface frameworkInterface{
  width: string,
  height: string,
  isPc: boolean,
  state: number,
  timing: any,
  progressTime: any,
  progressNum: number
  dialogClass: boolean,
  color1: string,
  color2: string,
  color3: string,
  nightMode: nightModeInterface
}
interface nightModeInterface{
  top: string,
  left: string
}
/**
 * 变量区
 */
const proxy = inject("proxy");
const { $http,$cookies,$otherUrl } = proxy as any;
const router = useRouter();
const store = useStore();
const navigation = reactive<navigationInterface>({
  options: 0,
  list: ['homePage','user','message','wallpaper','setUp']
});
const framework = reactive<frameworkInterface>({
  width: window.innerWidth<1330?'1330px':'100%',
  height: window.innerHeight<700?'700px':'100%',
  isPc: true,
  state: -2,
  timing: null,
  progressTime: null,
  progressNum: 0,
  dialogClass: false,
  color1: '#ffffff',
  color2: '#2c2c2c',
  color3: 'color-black',
  nightMode: {
    top: 'calc('+(window.innerHeight<700?'700px':'100%')+' - 100px)',
    left: 'calc('+(window.innerWidth<1330?'1330px':'100%')+' - 60px)'
  }
})
/**
 * 方法区
 */
const Click = (val:number) => {
  navigation.options = val;
  switch (val){
    case 0:
      router.push({
        'path': '/homePage'
      });
      break;
    case 1:
      router.push({
        'path': '/user'
      });
      break;
    case 2:
      router.push({
        'path': '/message'
      });
      break;
    case 3:
      router.push({
        'path': '/wallpaper'
      });
      break;
    case 4:
      router.push({
        'path': '/setUp'
      });
      break;
  }
}
const uuidCheck = () => {
  framework.timing = setInterval(()=>{
    if (framework.state === 0){
      clearInterval(framework.timing);
    } else {
      if ($cookies.get('uuid')===null){
        framework.state = 0;
        framework.dialogClass = true;
        clearInterval(framework.timing);
        ElMessage.error(store.state.language===1?'The account is invalid and log in again':'帐号无效，请重新登录');
      }else{
        if ($cookies.get('uuid') !== store.state.uuid){
          framework.state = 0;
          framework.dialogClass = true;
          clearInterval(framework.timing);
          ElMessage.error(store.state.language===1?'The UUID is invalid. Log in to the system again':'UUID无效。请重新登录系统');
        }
      }
    }
  },8000);
}
const announcement = () => {
  framework.dialogClass = true;
  $http.get('/L/obtainAnnouncement').then((res1:any)=>{
    if (res1.data['is']){
      let content:any = [];
      res1.data['content'].forEach((item:any)=>{
        content.push(JSON.parse(item));
      });
      store.commit('modifyAnnouncement',{is:res1.data['open'],title:res1.data['title'],time:res1.data['time'],content:content});
    }
  });
}
const displayMode = () => {
  store.commit('modifyDisplayMode',{val:!store.state.displayMode});
  [framework.color1,framework.color2] = [framework.color2,framework.color1]
  framework.color3 = store.state.displayMode?'color-white':'color-black';
}
const progress = () => {
  if($cookies.get('loading')===null){
    framework.state = -1;
    $cookies.set('loading','0',{ expires: -1 });
  }else{
    framework.state = 0;
  }
}
const stateChange = (val: number) =>{
 framework.state = val;
}
const optionsChange = (val:number) => {
  navigation.options = val;
}
const userInformationQuery = () => {
  $http.post('/User/userUUID',{
    uuid: $cookies.get('uuid')
  }).then((data:any)=>{
    uuidCheck();
    store.commit('modifyUserInformation',{val:data.data[0]});
    store.commit('modifyLanguage',{val:data.data[0]['language']});
    store.commit('modifyUUID',{val:data.data[0]['userId']});
    gainPermissions();
    framework.state = 1;
    if (window.location.pathname == '/'){
      router.push({ 'path': '/homePage' });
      navigation.options = 0;
    } else{
      router.push({ 'path': window.location.pathname });
      switch (window.location.pathname){
        case '/user':
          navigation.options = 1;
          break;
        case '/message':
          navigation.options = 2;
          break;
        case '/wallpaper':
          navigation.options = 3;
          break;
        case '/setUp':
          navigation.options = 4;
          break;
      }
    }
  }).catch(()=>{
    $cookies.remove('uuid');
    framework.state = 0;
    ElMessage.error(store.state.language===1?'The UUID is invalid. Log in to the system again':'UUID无效。请重新登录系统');
  });
}
const gainPermissions = () => {
  $http.get('/admin/PermissionsView',{
    params:{
      uuid:$cookies.get('uuid')
    }
  }).then((res:any)=>{
    store.commit('modifyPermissions',{val:res.data[0]});
  })
}

onMounted(()=>{
  if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    framework.isPc = false;
  }
  if ($cookies.get('uuid')!==null){
    userInformationQuery();
    gainPermissions();
  }else{
    announcement();
    progress();
  }
})
/**
 * 全局变量
 */
provide('modifyFramework', (val:number) => {
  framework.state = val;
});
provide('modifyDialogClass', (val:boolean) => {
  framework.dialogClass = val;
});
/**
 * 监视浏览器分辨率变化
 */
window.onresize = function(){
  if (window.innerWidth<1330){
    framework.width = '1330px';
  }else{
    framework.width = '100%';
  }
  if (window.innerHeight<700){
    framework.height = '700px';
  }else{
    framework.height = '100%';
  }
}
</script>

<style scoped lang="scss">
.background{
  overflow: auto;
  display: flex;
  user-select: none;
  position: relative;
  .background-video{
    object-fit: fill;
    position: absolute;
    top:0;
  }
  .system{
    margin: auto;
    width: 1200px;
    height: 700px;
    border-radius: 50px;
    display: flex;
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    z-index: 1;
    opacity:0.9;
    .menu{
      width: 150px;
      height: 100%;
      border-top-left-radius: 50px;
      border-bottom-left-radius: 50px;
    }
    .window{
      width: calc(100% - 200px);
      margin-top: 3%;
      height: 90%;
      border-radius: 50px;
      .accordingWindow{
        width: 95%;
        height: 90%;
        margin: 3.5% 0 0 2.5%;
      }
    }
    .menu-button{
      width: 50px;
      height: 50px;
      border-radius: 100%;
      margin-left: 50px;
      margin-top: 10px;
      cursor:pointer;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .logTo-background{
      width: calc(100% - 350px);
      font-size: 100px;
      color: white;
      height: 100%;
    }
  }
  .displayMode{
    position: absolute;
    z-index: 2;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    display: flex;
    cursor: pointer;
  }
}
.main-dialog{
  ::v-deep .el-dialog__body{
    padding: 20px 10px 0 10px;
  }
  ::v-deep .el-dialog__footer{
    padding: 0;
  }
  //::v-deep .el-dialog{
  //  border-radius: 20px;
  //}
  .preview-content{
    width: 100%;
    height: 350px;
    margin-bottom: 10px;
  }
}
.color-black{
  background-color: black;
}
.color-white{
  background-color: white;
}

</style>
