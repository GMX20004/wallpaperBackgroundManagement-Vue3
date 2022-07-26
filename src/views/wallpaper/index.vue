<template>
  <div class="message">
    <div class="body-hierarchy1">
      <el-button :type="Select===0?'primary':''" @click="SelectButton(0)">{{language===1?'Online wallpaper':'已上线'}}</el-button>
      <el-button :type="Select===1?'primary':''" @click="SelectButton(1)">{{language===1?'Subject to audit':'待审核'}}</el-button>
      <el-button :type="Select===2?'primary':''" @click="SelectButton(2)">{{language===1?'Newly increased':'批量新增'}}</el-button>
    </div>
    <div class="body-hierarchy2">
      <div v-show="Select===0" class="Project1">
        <div  style="height: 100%;overflow: auto">
          <el-scrollbar class="Project1-container">
            <ul v-infinite-scroll="onlineLoad" :infinite-scroll-disabled="online.disabled">
              <li v-for="(item,i) in online.wallpaperList" :key="i" class="wallpaper-line">
                <span v-for="(item1,p) in item" :key="p">
                <el-image
                  style="width: 100%;height: 100%;cursor: pointer"
                  :src="$imgUrl+item1['storageLocation']+'/'+item1['id']+'.'+item1['type']"
                  @click="onlineImage(item1['id'])"
                  lazy/>
              </span>
              </li>
            </ul>
            <p v-if="online.loading">Loading...</p>
            <p v-if="online.disabled">No more</p>
          </el-scrollbar>
        </div>
      </div>
      <div v-show="Select===1" class="Project2"></div>
      <div v-show="Select===2" class="Project3"></div>
    </div>
    <el-dialog v-model="dialog" v-loading="picture.loading" width="60%">
      <div class="dialog-body">
        <span class="dialog-body-left">
          <el-image
            style="width: 100%;height: 100%;"
            fit="scale-down"
            :src="$imgUrl+picture.details['storageLocation']+'/'+picture.details['id']+'.'+picture.details['type']"></el-image>
        </span>
        <span class="dialog-body-right">
            <el-form
              class="dialog-body-right-form"
              ref="ruleFormRef"
              :model="ruleForm"
              :rules="rules"
              label-width="120px"
              size="default">
              <el-form-item :label="language===1?'Title:':'标题:'" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
              </el-form-item>
              <el-form-item :label="language===1?'Label:':'标签:'" prop="label">
                <el-tag
                  v-for="tag in ruleForm.label"
                  :key="tag"
                  closable
                  style="margin-right: 10px"
                  :disable-transitions="false"
                  @close="handleClose(tag)"
                >
                    {{ tag }}
                </el-tag>
                <el-input
                  v-if="inputVisible"
                  ref="InputRef"
                  v-model="inputValue"
                  style="width: 80px;"
                  size="small"
                  @keyup.enter="handleInputConfirm"
                  @blur="handleInputConfirm"
                />
                <el-button v-else style="width: 80px;" size="small" @click="showInput">
                  + New Tag
                </el-button>
              </el-form-item>
              <el-form-item :label="language===1?'State:':'状态:'">
                <el-select>
                  <el-option></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="language===1?'Storage location:':'存储位置:'">
                <el-select>
                  <el-option></el-option>
                </el-select>
              </el-form-item>
            </el-form>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { inject, nextTick, reactive, ref } from "vue";
import Qs from 'qs';
import { FormRules , ElInput} from "element-plus";
/**
 * 接口区
 */
interface pictureInterface{
  id: number,
  details:any,
  loading: boolean
}
interface ruleFormInterface{
  title: string,
  label: string[],
  state: number,
  storageLocation: string
}
interface onlineInterface{
  selected:number,
  wallpaperList :any[],
  total: number,
  isReturn:boolean,
  disabled: boolean,
  loading: boolean
  form:{
    page: number,
    limit:number
  }
}
/**
 * 变量区
 */
// 公共
const proxy = inject("proxy");
let language:any = inject('language');
const { $imgUrl } = proxy as any;
const { $http } = proxy as any;
let Select = ref<number>(0);
const dialog = ref<boolean>(false);
const picture = reactive<pictureInterface>({
  id: 0,
  loading: false,
  details: {}
});
const ruleForm = reactive<ruleFormInterface>({
  title: '',
  label: [],
  state: 0,
  storageLocation: ''
});
const rules  = reactive<FormRules>({
  title:{ required: true, message: 'Please input Activity name', trigger: 'blur' },
  label:{ required: true, message: 'Please input Activity name', trigger: 'blur'}
});
const inputValue = ref('');
const inputVisible = ref(false);
const InputRef = ref<InstanceType<typeof ElInput>>();
// 已上线
const online = reactive<onlineInterface>({
  selected: 0,
  wallpaperList:[],
  total: 0,
  isReturn: true,
  disabled: false,
  loading:false,
  form:{
    page:1,
    limit:30
  }
});
/**
 * 方法区
 */
// 公共
  const SelectButton = (num:number) => {
    switch (num) {
      case 0:
        onlineWallpaperQuery();
        break;
      case 1:
        break;
      case 2:
        break;
    }
    Select.value = num;
  }
  const handleClose = (tag: string) => {
    ruleForm.label.splice(ruleForm.label.indexOf(tag), 1);
  }
  const showInput = () => {
    inputVisible.value = true
    nextTick(() => {
      InputRef.value!.input!.focus()
    })
  }
  const handleInputConfirm = () => {
    if (inputValue.value) {
      ruleForm.label.push(inputValue.value)
    }
    inputVisible.value = false
    inputValue.value = ''
  }
// 已上线
  const onlineLoad = () => {
    online.loading = true;
    if (online.isReturn){
      online.isReturn = false;
      setTimeout(() => {
        online.form.page++;
        onlineWallpaperQuery();
      }, 2000);
    }
  }
  const onlineWallpaperQuery = () => {
    $http.get('/Wallpaper/daily',{
      params: online.form
    }).then((res:any)=>{
      let temporary = [];
      if (res.data['data'].length<30)online.disabled = true;
      online.loading = false;
      for (let i=0;i<res.data['data'].length;i++){
        temporary.push(res.data['data'][i]);
        if ((i+1)%6==0){
          online.wallpaperList.push(temporary);
          temporary = [];
        }
      }
      online.total = res.data['total'];
      online.isReturn = true;
    });
  }
  const onlineImage = (id:any) =>{
    picture.loading = true;
    picture.id = id;
    $http.post('/Wallpaper/wallpaper?'+Qs.stringify({
      id:id
    })).then((res:any)=>{
      picture.details = res.data[0];
      ruleForm.title = res.data[0]['theTitle'];
      if (res.data[0]['theLabel'].includes('.')){
        ruleForm.label = res.data[0]['theLabel'].split('.');
      }else{
        ruleForm.label = res.data[0]['theLabel'].split(',');
      }
      ruleForm.storageLocation = res.data[0]['storageLocation'];
      // 状态 ruleForm.title = res.data[0]
      picture.loading = false;
    });
    dialog.value = true;
  }
</script>

<style scoped lang="scss">
.message{
  width: 100%;
  height: 100%;
  .ps{
    height: 100%;
  }
  .body-hierarchy1{
    width: 100%;
    text-align: center;
    ::v-deep .el-button{
      margin: 0;
      border-radius: 0px;
      width: 120px;
    }
  }
  .body-hierarchy2{
    width: 100%;
    height: calc(100% - 40px);
    margin-top: 10px;
    border: 1px solid #cccfd4;
    border-radius: 20px;
    .Project1{
      width: 96%;
      height: 100%;
      margin-left: 2%;
      .Project1-container{
        height: 100%;
        overflow: auto;
      }
      p{
        width: 100%;
        height: 20px;
        text-align: center;
        margin: 10px 0 10px 0;
      }
    }
    .wallpaper-line{
      width: 100%;
      height: 200px;
      display: flex;
      margin-bottom: 20px;
      span{
        width: 120px;
        height: 100%;
        margin-left: calc((100% / 5 - 120px)/2);
      }
    }
  }
  .dialog-body{
    width: 100%;
    display: flex;
    height: 500px;
    .dialog-body-left{
      width: 300px;
      height: 480px;
      margin: 10px;
    }
    .dialog-body-right{
      width: calc(100% - 350px);
      height: 480px;
      margin: 10px;
      border-left: 1px solid #b1b4b9;
      .dialog-body-right-form{
        width: 100%;
      }
    }
  }
}
</style>

