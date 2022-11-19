<template>
  <div class="logIn">
    <div class="logTo-interface">
      <div class="logTo-title"><b>LogIn</b></div>
      <el-form
        style="width: 96%;margin: 50px 0 0 2%;"
        ref="ruleFormRef"
        :model="logIn"
        :rules="rules"
        label-width="80px">
        <el-form-item label="Account" prop="account">
          <el-input v-model="logIn.account" placeholder="Please input Account" clearable></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="logIn.password" type="password" placeholder="Please input Password" show-password></el-input>
        </el-form-item>
        <el-form-item>
        <span style="width: 100%;display: flex">
          <el-image fit="scale-down" :src="logIn.yzmImg" style="cursor: pointer;height: 100%" @click="yzmQuery"></el-image>
          <el-input style="margin-left: 20px;width: 100px;" maxlength="4" v-model="logIn.yzmText"  @keydown.enter="submit(ruleFormRef)" placeholder="Please input" clearable></el-input>
        </span>
        </el-form-item>
      </el-form>
      <el-button  style="width: 90%;margin: 20px 0 0 5%" type="primary" @click="submit(ruleFormRef)">LogIn</el-button>
      <div style="width: 96%;margin:10px 0 0 2%;text-align: right"><span style="color: #2c95d4;cursor: pointer" @click="visitorsLogin">Visitors to login</span></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, reactive, ref } from "vue";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { useStore } from  "vuex";
import Qs from "qs";
import router from "@/router";
const proxy = inject("proxy");
const { $http,$cookies } = proxy as any;
interface logInInterface{
  account: string,
  password: string,
  verificationCode: string,
  yzmImg: any,
  yzm: string,
  yzmText: string
}
const store = useStore();
const ruleFormRef = ref<FormInstance>();
const logIn = reactive<logInInterface>({
  account: '',
  password: '',
  verificationCode: '',
  yzmImg: null,
  yzm: '',
  yzmText: ''
});
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input'));
  } else {
    if (!ruleFormRef.value) return;
    callback()
  }
}
const rules  = reactive<FormRules>({
  account:{  validator: validatePass, trigger: 'blur' },
  password:{  validator: validatePass, trigger: 'blur'}
});
const emit = defineEmits(['cycle','state','options']);
/**
 * 方法区
 */
const submit = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      if (logIn.yzmText.toLowerCase() !== logIn.yzm.toLowerCase()){
        ElMessage({
          message: store.state.language===1?'Verification code error, please enter again':'验证码错误,请重新输入',
          type: 'warning',
        });
        yzmQuery();
      }else{
        $http.post('/admin/e4c984df9f364376992066fd393d89fe?'+Qs.stringify({
          account: logIn.account,
          password: logIn.password
        })).then((res:any)=>{
          if (res.data['exists']){
            ElMessage({
              message: store.state.language===1?'Login successful':'登录成功',
              type: 'success',
            });
            $cookies.set('uuid',res.data['uuid'],{ expires: -1 });
            userInformationQuery();
          }else{
            ElMessage.error(store.state.language===1?'Account or password is incorrect':'帐号或密码错误')
          }
        });
      }
    } else {
      return false
    }
  });
}
const yzmQuery = () => {
  $http.get('/L/yzm').then((res:any)=>{
    logIn.yzmImg = 'data:image/png;base64,'+res.data['img'];
    logIn.yzm = res.data['text'];
    logIn.yzmText = '';
  })
}
const visitorsLogin = () =>{
  $cookies.set('uuid','000000',{ expires: -1 });
  userInformationQuery();
}
const userInformationQuery = () => {
  $http.post('/User/userUUID',{
    uuid: $cookies.get('uuid')
  }).then((data:any)=>{
    emit('cycle');
    store.commit('modifyUserInformation',{val:data.data[0]});
    store.commit('modifyLanguage',{val:data.data[0]['language']});
    store.commit('modifyUUID',{val:data.data[0]['userId']});
    gainPermissions();
    emit('state',1);
    if (window.location.pathname == '/'){
      router.push({ 'path': '/homePage' });
      emit('options',0);
    } else{
      router.push({ 'path': window.location.pathname });
      switch (window.location.pathname){
        case '/user':
          emit('options',1);
          break;
        case '/message':
          emit('options',2);
          break;
        case '/wallpaper':
          emit('options',3);
          break;
        case '/setUp':
          emit('options',4);
          break;
      }
    }
  }).catch(()=>{
    $cookies.remove('uuid');
    emit('state',0);
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
  yzmQuery();
})
</script>

<style scoped lang="scss">
.logIn{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .logTo-interface{
    width: 300px;
    height: 400px;
    border-radius: 20px;
    background-color: white;
    margin-right: 5rem;
    .logTo-title{
      width: 100%;
      margin-top: 10px;
      font-size: 40px;
      text-align: center;
      color: #2c95d4;
    }
  }
}
</style>
