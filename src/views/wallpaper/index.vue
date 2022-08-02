<template>
  <div class="message">
    <div class="body-hierarchy1">
      <el-button :type="Select===0?'primary':''" @click="SelectButton(0)">{{language===1?'Online wallpaper':'已上线'}}</el-button>
      <el-button :type="Select===1?'primary':''" @click="SelectButton(1)">{{language===1?'Not online wallpaper':'未上线'}}</el-button>
      <el-button :type="Select===2?'primary':''" @click="SelectButton(2)">{{language===1?'Batch upload':'批量上传'}}</el-button>
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
      <div v-show="Select===1" class="Project1">
        <div  style="height: 100%;overflow: auto">
          <el-scrollbar class="Project1-container">
            <ul v-infinite-scroll="notOnlineLoad" :infinite-scroll-disabled="notOnline.disabled">
              <li v-for="(item,i) in notOnline.wallpaperList" :key="i" class="wallpaper-line">
                <span v-for="(item1,p) in item" :key="p">
                <el-image
                  style="width: 100%;height: 100%;cursor: pointer"
                  :src="$imgUrl+item1['storageLocation']+'/'+item1['id']+'.'+item1['type']"
                  @click="onlineImage(item1['id'])"
                  lazy/>
              </span>
              </li>
            </ul>
            <p v-if="notOnline.loading">Loading...</p>
            <p v-if="notOnline.disabled">No more</p>
          </el-scrollbar>
        </div>
      </div>
      <div v-show="Select===2" class="Project3">
        <el-upload
          style="margin: 20px 0 0 0"
          v-model:file-list="batchUpload.fileList"
          action="#"
          :multiple="true"
          accept=".jpg,.png,.jpeg,.gif,.webp"
          :auto-upload="false"
          list-type="picture-card"
          :on-change="updateChange"
          :on-preview="handlePictureCardPreview"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>
        <div style="width: 80%;margin-left: 10%;text-align: center">
          <el-button style="width: 80%;" type="success" @click="upload" :disabled="userPermissions && userPermissions['wallpaperUpload']===0">{{language===1?'Upload':'上传'}}</el-button>
        </div>
      </div>
    </div>
    <el-image-viewer v-if="batchUpload.dialogVisible" @close="batchUpload.dialogVisible=false" :url-list="[batchUpload.dialogImageUrl]"/>
    <el-dialog v-model="dialog" v-loading="picture.loading" :before-close="exitReset" width="60%">
      <div class="dialog-body">
        <span class="dialog-body-left">
          <el-image
            style="width: 100%;height: 100%;"
            fit="scale-down"
            :src="$imgUrl+picture.details['storageLocation']+'/'+picture.details['id']+'.'+picture.details['type']"></el-image>
        </span>
        <span class="dialog-body-right">
          <perfect-scrollbar>
            <el-form
              class="dialog-body-right-form"
              ref="ruleFormRef"
              :model="ruleForm"
              :rules="rules"
              label-width="120px"
              size="default">
              <el-form-item :label="language===1?'Title:':'标题:'" prop="title">
                <el-input v-model="ruleForm.title" :disabled="(userPermissions['onlineWallpaperModifyTitle']===0 && Select===0) || (userPermissions['notOnlineWallpaperModifyTitle']===0 && Select===1)"></el-input>
              </el-form-item>
              <el-form-item :label="language===1?'Label:':'标签:'" prop="label">
                <el-tag
                  v-for="tag in ruleForm.label"
                  :key="tag"
                  :closable="(userPermissions['onlineWallpaperModifyLabel']===1 && Select===0) || (userPermissions['notOnlineWallpaperModifyLabel']===1 && Select===1)"
                  style="margin:0 10px 5px 0"
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
                <el-button v-else style="width: 80px;" size="small" v-show="(userPermissions['onlineWallpaperModifyLabel']===1 && Select===0) || (userPermissions['notOnlineWallpaperModifyLabel']===1 && Select===1)" @click="showInput">
                  + New Tag
                </el-button>
              </el-form-item>
              <el-form-item :label="language===1?'State:':'状态:'">
                <el-select v-model="ruleForm.state" :disabled="(userPermissions['onlineWallpaperModifyState']===0 && Select===0) || (userPermissions['notOnlineWallpaperModifyState']===0 && Select===1)">
                  <el-option
                    v-for="item in wallpaperState"
                    :key="item.val"
                    :label="language===1?item.English:item.Chinese"
                    :value="item.val"
                    :disabled="item['disabled']"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="language===1?'Storage location:':'存储位置:'">
                <el-select v-model="ruleForm.storageLocation" :disabled="(userPermissions['onlineWallpaperModifyLocation']===0 && Select===0) || (userPermissions['notOnlineWallpaperModifyLocation']===0 && Select===1)">
                  <el-option
                    v-for="item in folderType"
                    :key="item.id"
                    :label="language===1?item['folder']:item['note']"
                    :value="item['folder']"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div style="width: 100%;text-align: center">
              <el-button @click="cancel(ruleFormRef)">{{language===1?'Cancel':'取消'}}</el-button>
              <el-button type="primary" :disabled="(userPermissions['onlineWallpaperModify']===0 && Select===0) || (userPermissions['notOnlineWallpaperModify']===0 && Select===1)" @click="submit(ruleFormRef)">{{language===1?'Save':'保存'}}</el-button>
            </div>
          </perfect-scrollbar>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { inject, nextTick, onMounted, reactive, ref } from "vue";
import Qs from 'qs';
import { FormRules, ElInput, UploadProps, ElMessage, FormInstance } from "element-plus";
/**
 * 接口区
 */
interface pictureInterface{
  id: number,
  details:any,
  loading: boolean
}
interface ruleFormInterface{
  id: number,
  title: string,
  label: string[],
  state: number,
  storageLocation: string
}
interface wallpaperInterface{
  selected:number,
  wallpaperList :any[],
  total: number,
  isReturn:boolean,
  disabled: boolean,
  loading: boolean
  form:any
}
interface uploadInterface{
  fileList: any[],
  dialogImageUrl: string,
  dialogVisible: boolean
}
/**
 * 变量区
 */
// 公共
const proxy = inject("proxy");
const { $imgUrl } = proxy as any;
const { $http } = proxy as any;
const { $cookies } = proxy as any;
const userPermissions:any = inject('userPermissions');
let language:any = inject('language');
const modifyIsLogTo:any = inject('modifyIsLogTo');
let Select = ref<number>(0);
const dialog = ref<boolean>(false);
const picture = reactive<pictureInterface>({
  id: 0,
  loading: false,
  details: {}
});
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<ruleFormInterface>({
  id: 0,
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
const folderType = ref<any>([]);
const wallpaperState = [
  {val:0,Chinese:'未审核',English:'Not approved',disabled: true},
  {val:1,Chinese:'未上线',English:'Not online'},
  {val:2,Chinese:'已上线',English:'Online'},
  {val:3,Chinese:'回收站',English:'Recycle bin'}
];
// 已上线
const online = reactive<wallpaperInterface>({
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
// 未上线
const notOnline = reactive<wallpaperInterface>({
  selected: 0,
  wallpaperList:[],
  total: 0,
  isReturn: true,
  disabled: false,
  loading:false,
  form:{
    page:1,
    limit:30,
    uuid:$cookies.get('uuid')
  }
});
// 批量上传
const batchUpload = reactive<uploadInterface>({
  fileList:[],
  dialogImageUrl: '',
  dialogVisible:false
})
/**
 * 方法区
 */
// 公共
  const init = () => {
    // 获取壁纸文件夹
    $http.get('/admin/586c0e7bda874d5fa1749c56963077dc').then((res:any)=>{
      folderType.value = res.data;
    });
  }
  const SelectButton = (num:number) => {
    switch (num) {
      case 0:
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
  const submit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid) => {
      if (valid) {
        let theLabel = '';
        ruleForm.label.forEach(item=>{
          theLabel += item+',';
        });
          $http.post("/admin/ccef83e1d2ff455fae16680c906f2239",{
            id: ruleForm.id,
            theTitle: ruleForm.title,
            theLabel: theLabel.slice(0,theLabel.length-1),
            storageLocation: ruleForm.storageLocation,
            state: ruleForm.state,
            uuid: $cookies.get('uuid')
          }).then((res:any)=>{
          if (res.data){
            ElMessage({
              message: language===1?'Successful':'成功',
              type: 'success',
            })
          }else{
            ElMessage.error(language===1?'Failure':'失败');
          }
        });
      }
    });
  }
  const cancel = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields()
    ruleForm.title = '';
    ruleForm.label = [];
    ruleForm.state = 0;
    ruleForm.storageLocation = '';
    dialog.value = false;
  }
  const onlineImage = (id:any) =>{
  picture.loading = true;
  picture.id = id;
  $http.post('/Wallpaper/wallpaper?'+Qs.stringify({
    id:id
  })).then((res:any)=>{
    picture.details = res.data[0];
    ruleForm.id = res.data[0]['id'];
    ruleForm.title = res.data[0]['theTitle'];
    if (res.data[0]['theLabel'].includes('.')){
      ruleForm.label = res.data[0]['theLabel'].split('.');
    }else{
      ruleForm.label = res.data[0]['theLabel'].split(',');
    }
    ruleForm.storageLocation = res.data[0]['storageLocation'];
    ruleForm.state = res.data[0]['state'];
    picture.loading = false;
  });
  dialog.value = true;
}
  const exitReset = (done:any) => {
    ruleForm.title = '';
    ruleForm.label = [];
    ruleForm.state = 0;
    ruleForm.storageLocation = '';
    done();
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

// 未上线
  const notOnlineLoad = () => {
    notOnline.loading = true;
    if (notOnline.isReturn){
      notOnline.isReturn = false;
      setTimeout(() => {
        notOnline.form.page++;
        notOnlineWallpaperQuery();
      }, 2000);
    }
  }
  const notOnlineWallpaperQuery = () => {
    $http.get('/admin/0529588ecb8d4246bc0dc5302643b62d',{
      params: notOnline.form
    }).then((res:any)=>{
      let temporary = [];
      if (res.data['data'].length<30)notOnline.disabled = true;
      notOnline.loading = false;
      for (let i=0;i<res.data['data'].length;i++){
        temporary.push(res.data['data'][i]);
        if ((i+1)%6==0){
          notOnline.wallpaperList.push(temporary);
          temporary = [];
        }
      }
      notOnline.total = res.data['total'];
      notOnline.isReturn = true;
    });
  }
// 批量上传
  const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
    batchUpload.dialogImageUrl = uploadFile['url'] as string;
    batchUpload.dialogVisible = true;
  }
  const updateChange = (file: any, fileList: any) => {
    if (!/\.(jpg|png|jpeg|gif|webp)$/.test(file.name)) {
      ElMessage.error('文件格式错误');
      fileList.splice(fileList.length-1, 1);
      return;
    }
  }
  const upload = ()=>{
      // let fileFormData = new FormData();
      // fileFormData.append("file", file.file);
    batchUpload.fileList[0].onProgress({percent: 10})
  }
  onMounted(()=>{
    if ($cookies.get('uuid')===null){
      modifyIsLogTo(false);
    }
    init();
  })
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
      width: 150px;
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
    .Project3{
      width: 96%;
      height: 100%;
      margin-left: 2%;
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
      .ps{
        width: 100%;
        height: 100%;
      }
      .dialog-body-right-form{
        width: 100%;
      }
    }
  }
}
</style>

