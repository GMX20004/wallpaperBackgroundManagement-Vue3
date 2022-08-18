<template>
  <div class="message" :class="store.state['displayMode']?'night':'daytime'">
    <div class="body-hierarchy1">
      <el-button :type="Select===0?'primary':''" @click="SelectButton(0)">{{store.state['language']===1?'Online wallpaper':'已上线'}}</el-button>
      <el-button :type="Select===1?'primary':''" @click="SelectButton(1)">{{store.state['language']===1?'Not online wallpaper':'未上线'}}</el-button>
      <el-button :type="Select===2?'primary':''" @click="SelectButton(2)">{{store.state['language']===1?'Batch upload':'批量上传'}}</el-button>
    </div>
    <div class="body-hierarchy2">
      <div v-show="Select===0" class="Project1">
        <div  style="height: 100%;overflow: auto">
          <el-scrollbar class="Project1-container">
            <ul v-infinite-scroll="onlineLoad" :infinite-scroll-disabled="online.disabled">
              <li v-for="(item,i) in online.wallpaperList" :key="i" class="wallpaper-line">
                <span v-for="(item1,p) in item" :key="p">
                  <canvas style="cursor: pointer;width: 120px;height: 200px;" width="240" height="400" :ref="(el)=>wallpaperCanvas(el,item1)" @click="onlineImage(item1['id'])"/>
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
                  <canvas style="cursor: pointer;width: 120px;height: 200px;" width="240" height="400" :ref="(el)=>wallpaperCanvas(el,item1)" @click="onlineImage(item1['id'])"/>
                </span>
              </li>
            </ul>
            <p v-if="notOnline.loading">Loading...</p>
            <p v-if="notOnline.disabled">No more</p>
          </el-scrollbar>
        </div>
      </div>
      <div v-show="Select===2" class="Project3">
        <el-scrollbar style="width: 100%;height: 100%">
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
            <template #file="{ file }">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
              <el-progress v-if="batchUpload.isUpload && file===batchUpload.fileList[0]" type="circle" :percentage="batchUpload.percentage" />
              <span v-if="!batchUpload.isUpload" class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                <el-icon><zoom-in /></el-icon>
              </span>
              <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                <el-icon><Delete /></el-icon>
              </span>
            </span>
            </template>
          </el-upload>
          <div style="width: 80%;margin-left: 10%;text-align: center">
            <el-button v-if="!batchUpload.isUpload" style="width: 80%;" type="success" @click="upload" :disabled="store.state['permissions'] && store.state['permissions']['wallpaperUpload']===0">{{store.state['language']===1?'Upload':'上传'}}</el-button>
          </div>
        </el-scrollbar>
      </div>
    </div>
    <el-image-viewer v-if="batchUpload.dialogVisible" @close="batchUpload.dialogVisible=false" hide-on-click-modal :url-list="[batchUpload.dialogImageUrl]"/>
    <el-dialog v-model="dialog" width="1000px" :before-close="(done)=>dialogClose(done,ruleFormRef)">
      <div class="dialog-body" v-loading="picture.loading">
        <span class="dialog-body-left">
          <canvas ref="imageCanvas"/>
        </span>
        <span class="dialog-body-right">
          <el-scrollbar style="width: 100%;height: 100%">
            <el-form
              class="dialog-body-right-form"
              ref="ruleFormRef"
              :model="ruleForm"
              :rules="rules"
              label-width="120px"
              size="default">
              <el-form-item :label="store.state['language']===1?'Title:':'标题:'" prop="title">
                <el-input v-model="ruleForm.title" :disabled="(store.state['permissions']['onlineWallpaperModifyTitle']===0 && Select===0) || (store.state['permissions']['notOnlineWallpaperModifyTitle']===0 && Select===1)"></el-input>
              </el-form-item>
              <el-form-item :label="store.state['language']===1?'Label:':'标签:'" prop="label">
                <el-tag
                  v-for="tag in ruleForm.label"
                  :key="tag"
                  :closable="(store.state['permissions']['onlineWallpaperModifyLabel']===1 && Select===0) || (store.state['permissions']['notOnlineWallpaperModifyLabel']===1 && Select===1)"
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
                <el-button v-else style="width: 80px;" size="small" v-show="(store.state['permissions']['onlineWallpaperModifyLabel']===1 && Select===0) || (store.state['permissions']['notOnlineWallpaperModifyLabel']===1 && Select===1)" @click="showInput">
                  + New Tag
                </el-button>
              </el-form-item>
              <el-form-item :label="store.state['language']===1?'State:':'状态:'">
                <el-select v-model="ruleForm.state" :disabled="(store.state['permissions']['onlineWallpaperModifyState']===0 && Select===0) || (store.state['permissions']['notOnlineWallpaperModifyState']===0 && Select===1)">
                  <el-option
                    v-for="item in wallpaperState"
                    :key="item.val"
                    :label="store.state['language']===1?item.English:item.Chinese"
                    :value="item.val"
                    :disabled="item['disabled']"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="store.state['language']===1?'Storage location:':'存储位置:'">
                <el-select v-model="ruleForm.storageLocation" :disabled="(store.state['permissions']['onlineWallpaperModifyLocation']===0 && Select===0) || (store.state['permissions']['notOnlineWallpaperModifyLocation']===0 && Select===1)">
                  <el-option
                    v-for="item in folderType"
                    :key="item.id"
                    :label="store.state['language']===1?item['folder']:item['note']"
                    :value="item['folder']"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div style="width: 100%;text-align: center">
              <el-button @click="cancel(ruleFormRef)">{{store.state['language']===1?'Cancel':'取消'}}</el-button>
              <el-button type="primary" :disabled="(store.state['permissions']['onlineWallpaperModify']===0 && Select===0) || (store.state['permissions']['notOnlineWallpaperModify']===0 && Select===1)" @click="submit(ruleFormRef)">{{store.state['language']===1?'Save':'保存'}}</el-button>
              <el-icon size="20px" color="#2c95d4" style="position: relative;left: 200px;top:10px;cursor: pointer" @click="downloaded"><Download /></el-icon>
            </div>
          </el-scrollbar>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { inject, nextTick, onMounted, reactive, ref } from "vue";
import Qs from 'qs';
import { FormRules, ElInput, UploadProps, ElMessage, FormInstance } from "element-plus";
import { useStore } from "vuex";
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
  type: string,
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
  dialogVisible: boolean,
  isUpload: boolean,
  percentage: any
}
/**
 * 变量区
 */
// 公共
const proxy = inject("proxy");
const { $imgUrl } = proxy as any;
const { $http } = proxy as any;
const { $cookies } = proxy as any;
const { $file } = proxy as any;
const store = useStore();
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
  type: '',
  storageLocation: '',
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
let wallpaperRef:any = {}
const imageCanvas:any = ref();
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
    limit:18
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
    limit:18,
    uuid:$cookies.get('uuid')
  }
});
// 批量上传
const batchUpload = reactive<uploadInterface>({
  fileList:[],
  dialogImageUrl: '',
  dialogVisible:false,
  isUpload: false,
  percentage: 0,
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
              message: store.state['language']===1?'Successful':'成功',
              type: 'success',
            })
          }else{
            ElMessage.error(store.state['language']===1?'Failure':'失败');
          }
        });
      }
    });
  }
  const cancel = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    let title = ruleForm.title;
    let label = ruleForm.label;
    let state = ruleForm.state;
    let storageLocation = ruleForm.storageLocation;
    formEl.resetFields()
    ruleForm.title = title;
    ruleForm.label = label;
    ruleForm.state = state;
    ruleForm.storageLocation = storageLocation;
    dialog.value = false;
  }
  const onlineImage = (id:any) =>{
    dialog.value = true;
    picture.loading = true;
    if (picture.id === id && ruleForm.id === id){
      picture.loading = false;
    }else{
      picture.id = id;
      $http.post('/Wallpaper/wallpaper?'+Qs.stringify({
        id:id
      })).then((res:any)=>{
        picture.details = res.data[0];
        ruleForm.id = res.data[0]['id'];
        ruleForm.title = res.data[0]['theTitle'];
        ruleForm.type = res.data[0]['type'];
        if (res.data[0]['theLabel'] !== null){
          if (res.data[0]['theLabel'].includes('.')){
            ruleForm.label = res.data[0]['theLabel'].split('.');
          }else{
            ruleForm.label = res.data[0]['theLabel'].split(',');
          }
        }else{
          ruleForm.label = [];
        }
        ruleForm.storageLocation = res.data[0]['storageLocation'];
        ruleForm.state = res.data[0]['state'];
        drawing(imageCanvas.value,id,300,480);
      });
    }
}
  const drawing = (canvas:any,id:string, w:number, h:number) => {
    let image = wallpaperRef['ref'+id];
    if (image.width < w && image.height < h) {
      canvas.style.width = image.width + "px";
      canvas.style.height = image.height + "px";
    } else {
      if (w / h <= image.width / image.height) {
        canvas.style.width = w + "px";
        canvas.style.height = w * (image.height / image.width) + "px";
      } else {
        canvas.style.width = h * (image.width / image.height) + "px";
        canvas.style.height = h + "px";
      }
    }
    canvas.width = image.width;
    canvas.height = image.height;
    canvas.getContext('2d').drawImage(image,0,0,image.width,image.height);
    picture.loading = false;
  }
  const wallpaperCanvas = (el:any,item:any) => {
    let ctx = el.getContext('2d');
    let cimg = new Image();
    cimg.src = $imgUrl+item['storageLocation']+'/'+item['id']+'.'+item['type'];
    cimg.onload=function () {
      ctx.drawImage(cimg,0,0,240,400);
    }
    wallpaperRef['ref'+item['id']] = cimg;
  }
  const dialogClose = (done:any,formEl: FormInstance | undefined) => {
    if (!formEl) return;
    let title = ruleForm.title;
    let label = ruleForm.label;
    let state = ruleForm.state;
    let storageLocation = ruleForm.storageLocation;
    formEl.resetFields()
    ruleForm.title = title;
    ruleForm.label = label;
    ruleForm.state = state;
    ruleForm.storageLocation = storageLocation;
    done();
  }
  const downloaded = () => {
    let time = Date.now();
    $http.get('/L/downloadWallpaper',{
      responseType: 'blob',
      params:{
        id:ruleForm.id,
        time:time
      }
    }).then((res:any)=>{
      $file(res.data, time+'.'+ruleForm.type);
    })
  }
// 已上线
  const onlineLoad = () => {
    online.loading = true;
    if (online.isReturn){
      online.isReturn = false;
      setTimeout(() => {
        online.form.page++;
        onlineWallpaperQuery();
      }, 1000);
    }
  }
  const onlineWallpaperQuery = () => {
    $http.get('/Wallpaper/daily',{
      params: online.form
    }).then((res:any)=>{
      let temporary = [];
      if (res.data['data'].length<online.form['limit'])online.disabled = true;
      online.loading = false;
      for (let i=0;i<res.data['data'].length;i++){
        temporary.push(res.data['data'][i]);
        if ((i+1)%6==0){
          online.wallpaperList.push(temporary);
          temporary = [];
        }
      }
      if (temporary.length !== 0){
        online.wallpaperList.push(temporary);
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
      }, 1000);
    }
  }
  const notOnlineWallpaperQuery = () => {
    $http.get('/admin/0529588ecb8d4246bc0dc5302643b62d',{
      params: notOnline.form
    }).then((res:any)=>{
      let temporary = [];
      if (res.data['data'].length<notOnline.form['limit'])notOnline.disabled = true;
      notOnline.loading = false;
      for (let i=0;i<res.data['data'].length;i++){
        temporary.push(res.data['data'][i]);
        if ((i+1)%6==0){
          notOnline.wallpaperList.push(temporary);
          temporary = [];
        }
      }
      if (temporary.length !== 0){
        notOnline.wallpaperList.push(temporary);
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
  const handleRemove = (file: any) => {
    for(let i=0;i<batchUpload.fileList.length;i++){
      if (file === batchUpload.fileList[i]){
        batchUpload.fileList.splice(i,1);
        return;
      }
    }
  }
  const updateChange = (file: any, fileList: any) => {
    if (!/\.(jpg|png|jpeg|gif|webp)$/.test(file.name)) {
      ElMessage.error(store.state['language']===1?'File format error':'文件格式错误');
      fileList.splice(fileList.length-1, 1);
      return;
    }
    if (file.size > 5242880) {
      ElMessage.error(file.name+(store.state['language']===1?' Greater than':' 大于')+'5MB');
      fileList.splice(fileList.length-1, 1);
      return;
    }
  }
  const  upload = async ()=>{
    batchUpload.isUpload = true;
    while (batchUpload.fileList.length!==0){
      batchUpload.percentage = 0;
      let fileFormData = new FormData();
      fileFormData.append("userId", store.state['userInformation']['id']);
      fileFormData.append("file", batchUpload.fileList[0]['raw']);
      fileFormData.append('size', batchUpload.fileList[0]['size']);
      await $http.post('/L/UploadWallpaper',fileFormData,{
        onUploadProgress:function(progressEvent:any){
          batchUpload.percentage = (progressEvent['loaded']/progressEvent['total']*100).toFixed(1);
        }
      }).then((res:any)=>{
        if (res.data['state']){
          if (notOnline.disabled){
            if(notOnline.wallpaperList[notOnline.wallpaperList.length-1].length<6){
              notOnline.wallpaperList[notOnline.wallpaperList.length-1].push(res.data['data']);
            }else{
              notOnline.wallpaperList.push([res.data['data']]);
            }
          }
        }
      }).catch(()=>{
        ElMessage.error(store.state['language']===1?'Upload failed':'上传失败');
        batchUpload.isUpload = false;
        return;
      })
      batchUpload.fileList.splice(0,1);
    }
    batchUpload.isUpload = false;
  }
  onMounted(()=>{
    init();
  })
</script>

<style scoped lang="scss">
.message{
  width: 100%;
  height: 100%;
  user-select: none;
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
        width: 100%;
        overflow-y: auto;
        ul{
          li{
            span:first-child{
              margin: 0;
            }
          }
        }
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
      ::v-deep .el-upload-list{
        li{
          margin: 0 34px 8px 0;
        }
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
      text-align: center;
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
.daytime{

}
.night{
  ::v-deep .el-input__wrapper{
    background-color: #7a7a7a;
  }
  ::v-deep .el-dialog{
    background-color: #7a7a7a;
  }
}
</style>

