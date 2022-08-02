<template>
  <div class="message">
    <perfect-scrollbar style="display: flex">
      <span class="body-left">
        <div class="body-left-upper">
          <el-avatar style="width: 100px;height: 100px;" :src="headPortrait+userInformation['headPortrait']"/>
          <div style="margin-top: 10px"><b>{{userInformation['name']}}</b></div>
        </div>
        <div class="body-left-lower">
          <perfect-scrollbar>
            <div class="body-left-list" :class="messageType===1?'pitch-on':'uncheck'" @click="choose(1)">{{language===1?'System announcement':'系统公告'}}</div>
            <div class="body-left-list" :class="messageType===2?'pitch-on':'uncheck'" @click="choose(2)">{{language===1?'Important notice':'重要通知'}}</div>
          </perfect-scrollbar>
        </div>
      </span>
      <span class="body-right">
        <div v-if="messageType===1" class="body-right-Project-1">
            <span class="announcementSetUp">
              <perfect-scrollbar>
                <div style="width: 96%;display: flex;margin: 20px 0 0 2%;">
                  <span style="line-height: 30px;margin-right: 20px">{{language===1?'Whether to enable:':'是否启用:'}}</span>
                  <el-switch
                    v-model="isAnnouncement"
                    class="ml-2"
                    inline-prompt
                    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                    active-text="Y"
                    inactive-text="N"
                  />
                </div>
                <div style="width: 96%;margin: 20px 0 0 2%" v-show="isAnnouncement">
                  <div style="width: 100%;">
                    <el-date-picker
                      v-model="contentAnnouncement.time"
                      type="datetimerange"
                      range-separator="To"
                      :start-placeholder="language===1?'Start date':'开始时间'"
                      :end-placeholder="language===1?'End date':'结束时间'"
                    />
                  </div>
                  <div style="width: 100%;margin-top: 20px">
                    <el-input v-model="contentAnnouncement.title" :placeholder="language===1?'Title':'标题'" clearable />
                  </div>
                  <div style="width: 100%;margin-top: 20px">
                    <el-table :data="contentAnnouncement.content" border style="width: 100%;">
                      <el-table-column :label="language===1?'Type':'类型'" align="center">
                        <template #default="{row}">
                          <el-select v-model="row.type" :placeholder="language===1?'Select':'选择'">
                          <el-option
                            v-for="item in contentType"
                            :key="item.value"
                            :value="item.value"
                            :label="language===1?item.English:item.Chinese">
                          </el-option>
                        </el-select>
                        </template>
                      </el-table-column>
                      <el-table-column :label="language===1?'Content':'内容'" align="center">
                        <template #default="props">
                          <span v-if="props.row.type === 0">
                            <el-input v-model="props.row.text" :placeholder="language===1?'Input':'输入'" clearable></el-input>
                          </span>
                          <span v-else-if="props.row.type === 1">
                            <div v-if="props.row.pictureUrl" style="width: 120px;height: 120px;border-radius: 20px;border: 1px solid #b1b4b9">
                              <div style="width: 90%;text-align: right;">
                                <svg t="1658497974158" style="cursor: pointer;" @click="handleRemove(props.$index)" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2266" width="10" height="10">
                                  <path d="M562.688 510.976l321.408-321.408a36.672 36.672 0 0 0-51.84-51.84l-321.28 321.28L189.568 137.6a36.672 36.672 0 0 0-51.84 51.84l321.28 321.536-321.408 321.28a36.672 36.672 0 0 0 51.84 51.84l321.536-321.408 321.408 321.472a36.672 36.672 0 0 0 51.84-51.84z" fill="#ff0000" p-id="2267"></path>
                                </svg>
                              </div>
                              <teleport to="#modal-wrapper">
                              </teleport>
                              <el-image style="width: 80px;height: 80px;cursor: pointer" @click="handlePictureCardPreview(props.$index)" :src="props.row['pictureUrl']" fit="scale-down" />
                            </div>
                            <el-upload v-show="!props.row.pictureUrl" ref="upload" action="#" list-type="picture" accept=".jpg,.png,.jpeg,.gif,.webp" :show-file-list="false" :auto-upload="false"  :on-change="(file,fileList)=>updateChange(file,fileList,props.$index)">
                              <el-icon><Plus /></el-icon>
                            </el-upload>
                          </span>
                          <span v-else-if="props.row.type === 2">
                            <el-input v-model="props.row.text" :placeholder="language===1?'text':'文本'" clearable></el-input>
                            <el-input v-model="props.row.hyperlinks" :placeholder="language===1?'hyperlinks':'超链接'" clearable></el-input>
                          </span>
                        </template>
                      </el-table-column>
                      <el-table-column :label="language===1?'Operation':'操作'" align="center">
                        <template #default="props">
                          <el-dropdown trigger="click" placement="bottom-end" @command="(command)=>handleCommand(command,props.$index)">
                            <svg style="cursor:pointer;" t="1657871751755" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3823" width="30" height="30">
                              <path d="M415.930119 223.790358c0-52.980346 43.003528-95.983874 95.983874-95.983874s95.983874 43.003528 95.983874 95.983874-43.003528 95.983874-95.983874 95.983874S415.930119 276.770704 415.930119 223.790358z" p-id="3824"></path>
                              <path d="M415.930119 511.741979c0-52.980346 43.003528-95.983874 95.983874-95.983874s95.983874 43.003528 95.983874 95.983874-43.003528 95.983874-95.983874 95.983874S415.930119 564.722325 415.930119 511.741979z" p-id="3825"></path>
                              <path d="M415.930119 799.865614c0-52.980346 43.003528-95.983874 95.983874-95.983874s95.983874 43.003528 95.983874 95.983874-43.003528 95.983874-95.983874 95.983874S415.930119 852.673946 415.930119 799.865614z" p-id="3826"></path>
                            </svg>
                            <template #dropdown>
                              <el-dropdown-menu>
                                <el-dropdown-item :command="1">{{language===1?'More operations':'更多操作'}}</el-dropdown-item>
                                <el-dropdown-item :command="2">{{language===1?'Delete':'删除'}}</el-dropdown-item>
                              </el-dropdown-menu>
                            </template>
                          </el-dropdown>
                        </template>
                      </el-table-column>
                    </el-table>
                    <el-button style="width: 80%;margin: 20px 0 0 10%" @click="contentAdd">{{language===1?'Add':'新增'}}</el-button>
                    <div style="width: 80%;margin: 20px 0 0 10%;text-align: center">
                      <el-button @click="announcementCancel">{{language===1?'Cancel':'取消'}}</el-button>
                      <el-button @click="announcementSave" :disabled="userPermissions && userPermissions['systemAnnouncement']===0" type="primary">{{language===1?'Save':'保存'}}</el-button>
                    </div>
                  </div>
                </div>
              </perfect-scrollbar>
            </span>
            <span v-show="isAnnouncement" class="announcementPreview">
              <perfect-scrollbar>
                <div style="font-size: 20px;width: 96%;margin: 10px 0 0 2%;text-align: center"><b>{{contentAnnouncement.title}}</b></div>
                <div style="width: 100%;" v-for="(item,i) in contentAnnouncement.content" :key="i">
                  <div class="preview-content" :style="{'color': item['color'],'text-align': item['align'],'font-size': item['fontSize']+'px'}" v-if="item['type']===0">
                    {{item['text']}}
                  </div>
                  <div class="preview-content" v-if="item['type']===1 && item['pictureUrl']" :style="{'text-align': item['align']}">
                    <el-image :fit="item['pictureFit']?'scale-down':'fill'" :style="{'width':item['width']+'px','height':item['height']+'px'}" :src="item['pictureUrl']" />
                  </div>
                  <div class="preview-content" v-if="item['type']===2" :style="{'color': item['color'],'text-align': item['align'],'font-size': item['fontSize']+'px'}">
                    <a :href="item['hyperlinks']" :style="{'text-decoration':item['hyperlinksCss']['underline']?'':'none'}" :target="item['hyperlinksCss']['target']">{{item['text']}}</a>
                  </div>
                </div>
              </perfect-scrollbar>
            </span>
         </div>
        <div v-else-if="messageType===2" class="body-right-Project-2">
          <div class="important-div">
            <div style="width: 100%;">{{language===1?'Recipient':'收件人'}}:</div>
            <div style="width: 100%;margin-top: 10px;display: flex">
              <span style="width: 90%;">
                <el-select v-if="importantParameter.acceptType"
                           v-model="importantParameter.system"
                           multiple
                           collapse-tags
                           placeholder="Select"
                           style="width: 100%;">
                <el-option
                  v-for="item in userList"
                  :key="item['id']"
                  :label="item['name']+'-'+item['email']"
                  :value="item['email']"
                />
              </el-select>
                <el-input v-else style="width: 100%;" v-model="importantParameter.custom" :placeholder="language===1?'Please enter email address':'请输入电子邮箱'"></el-input>
              </span>
              <sapn style="width: 10%;text-align: center">
                <el-tooltip :content="importantParameter.acceptType?language===1?'Switching Custom':'切换自定义':language===1?'Switching system':'切换系统内'" :disabled="importantParameter.disabled" placement="top">
                  <el-switch
                    v-model="importantParameter.acceptType"
                    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #2C95D4"
                  />
                </el-tooltip>
              </sapn>
            </div>
          </div>
          <div class="important-div">
            <el-input
              v-model="importantParameter.content"
              maxlength="400"
              :placeholder="language===1?'Please input':'请输入'"
              show-word-limit
              resize="none"
              :autosize="{ minRows: 10, maxRows: 10 }"
              type="textarea"
            />
          </div>
          <div class="important-div" style="display: flex">
            <span style="width: 50%;text-align: right;display: flex">
              <el-image fit="scale-down" :src="importantYzm.img" style="cursor: pointer;height: 100%" @click="importantYZM"></el-image>
              <el-input style="margin-left: 20px;width: 100px;" maxlength="4" v-model="importantYzmText" :placeholder="language===1?'Please input':'请输入'"></el-input>
            </span>
            <span style="width: 50%;text-align: right">
              <el-button type="primary" :disabled="userPermissions && userPermissions['importantNotice']===0" @click="importantSend">{{language===1?'Send':'发送'}}</el-button>
            </span>
          </div>
        </div>
      </span>
    </perfect-scrollbar>
    <el-image-viewer v-if="dialogVisible" @close="dialogVisible=false" :url-list="[dialogImageUrl]"/>
    <el-drawer
      v-model="drawerAnnouncement"
      :title="language===1?'More operations':'更多操作'"
      direction="ltr">
      <div v-if="contentAnnouncement.content[current]['type']===0 || contentAnnouncement.content[current]['type']===2" style="width: 100%;">
        <div class="drawer-div">
          <span>{{language===1?'color':'颜色'}}:</span>
          <span><el-color-picker v-model="contentAnnouncement.content[current]['color']" /></span>
        </div>
        <div class="drawer-div">
          <span>{{language===1?'Font size':'字体大小'}}:</span>
          <span><el-input-number v-model="contentAnnouncement.content[current]['fontSize']" :min="1" :max="20" /></span>
        </div>
      </div>
      <div v-if="contentAnnouncement.content[current]['type']===1" style="width: 100%;">
        <div class="drawer-div">
          <span>{{language===1?'Adaptive':'自适应'}}:</span>
          <span><el-checkbox v-model="contentAnnouncement.content[current]['pictureFit']"></el-checkbox></span>
        </div>
        <div class="drawer-div">
          <span>{{language===1?'Width':'宽度'}}:</span>
          <span><el-input-number v-model="contentAnnouncement.content[current]['width']" :min="10" :max="200" /></span>
        </div>
        <div class="drawer-div">
          <span>{{language===1?'Height':'高度'}}:</span>
          <span><el-input-number v-model="contentAnnouncement.content[current]['height']" :min="10" :max="200" /></span>
        </div>
      </div>
      <div v-if="contentAnnouncement.content[current]['type']===2">
        <div class="drawer-div">
          <span>{{language===1?'Underline':'下划线'}}:</span>
          <span><el-checkbox v-model="contentAnnouncement.content[current]['hyperlinksCss']['underline']"></el-checkbox></span>
        </div>
        <div class="drawer-div">
          <el-select v-model="contentAnnouncement.content[current]['hyperlinksCss']['target']">
            <el-option
              v-for="item in jumpWay"
              :key="item.value"
              :label="language===1?item.English:item.Chinese"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div style="width: 100%;">
        <div class="drawer-div">
          <span>{{language===1?'align':'对齐'}}:</span>
          <span>
          <el-select v-model="contentAnnouncement.content[current]['align']">
            <el-option
              v-for="item in alignOptions"
              :key="item.value"
              :label="language===1?item.English:item.Chinese"
              :value="item.English">
            </el-option>
          </el-select>
        </span>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
/**
 * 接口区
 */
interface contentAnnouncementInterface{
  time: string[],
  title: string,
  content: any[]
}
interface importantParameterInterface{
  disabled: boolean,
  acceptType: boolean,
  system: string[],
  custom: string,
  content: string
}
/**
 * 变量区
 */
// 公共变量
const proxy = inject("proxy");
let language:any = inject('language');
const { $imgUrl } = proxy as any;
const { $http } = proxy as any;
const { $cookies } = proxy as any;
const modifyIsLogTo:any = inject('modifyIsLogTo');
const userPermissions:any = inject('userPermissions');
const userInformation:any = inject('userInformation');
const headPortrait = $imgUrl+'/headPortrait/';
const messageType = ref<number>(1);
const alignOptions = [{English:'left',Chinese:'左',value: 0},{English:'right',Chinese:'右',value: 1},{English:'center',Chinese:'居中',value: 2}];
const jumpWay = [{English:'Current Page Display',Chinese:'当前页面显示',value: '_self'},{English:'New page display',Chinese:'新页面显示',value: '_blank'},{English:'Corresponding window display',Chinese:'相应的窗口显示',value: 'three'}];
// 系统公告
const current = ref<number>(0);
const isAnnouncement = ref<boolean>(false);
let contentAnnouncement = reactive<contentAnnouncementInterface>({
  time: [],
  title: '',
  content: []
});
const contentType = [{English:'Text',Chinese:'文本',value: 0},{English:'Picture',Chinese:'图片',value: 1},{English:'Hyperlinks',Chinese:'超链接',value: 2}];
const dialogImageUrl = ref('');
const dialogVisible = ref(false);
const upload = ref<any>(null);
const drawerAnnouncement = ref(false);
// 重要通知
const importantParameter = reactive<importantParameterInterface>({
  disabled: false,
  acceptType: true,
  system: [],
  custom: '',
  content: ''
});
const importantYzm = reactive({
  img:'',
  text:''
});
const importantYzmText = ref<string>('');
const userList = ref<any[]>([]);
// 用户消息
const dropDown = ref<boolean>(false);
/**
 * 方法区
 */
// 公共
const choose = (num:number) => {
  switch (num){
    case 1:
      dropDown.value = false;
      messageType.value = num;
      break;
    case 2:
      if(userPermissions.value['importantSystemUsers']===0 || userPermissions.value['importantNoticeCustom']===0){
        if (userPermissions.value['importantNoticeCustom']===1) importantParameter.acceptType = false;
      }
      dropDown.value = false;
      importantInit();
      messageType.value = num;
      break;
  }
}
const base64 = (file:any, callBack: (data: string | ArrayBuffer | null) => void) => {
  let reader = new FileReader();
  reader.readAsDataURL(file)
  reader.onload = () => {
    callBack(reader.result);
  }
}

// 系统公告
const handleCommand = (command: number, val: number) => {
  current.value = val;
  if (command === 1) {
    drawerAnnouncement.value = true;
  } else {
    contentDelete(val);
  }
}
const contentDelete = (val: number) => {
  contentAnnouncement.content.splice(val, 1);
}
const contentAdd = () => {
  contentAnnouncement.content.push({
    type: null,
    text: '',
    hyperlinks: '',
    file: null,
    pictureUrl: '',
    pictureFit: true,
    color: '',
    fontSize: 10,
    align: 'left',
    width: 50,
    height: 50,
    hyperlinksCss:{
      target: '_blank',
      underline: true
    }
  });
}
const announcementCancel = () => {
  console.log(contentAnnouncement.content);
}
const announcementSave = () => {
  console.log(contentAnnouncement.content);
}
const updateChange = (file: any, fileList: any, num: number) => {
  if (!/\.(jpg|png|jpeg|gif|webp)$/.test(file.name)) {
    ElMessage.error('文件格式错误');
    fileList.splice(0, 1);
    return;
  } else {
    if (fileList.length === 2)
      fileList.splice(0, 1);
    contentAnnouncement.content[num]['file'] = file.raw;
    base64(file.raw, (data: string | ArrayBuffer | null) => {
      contentAnnouncement.content[num]['pictureUrl'] = data;
    });
  }
}
const handleRemove = (num: number) => {
  contentAnnouncement.content[num]['file'] = null;
  contentAnnouncement.content[num]['pictureUrl'] = '';
}
const handlePictureCardPreview = (num: number) => {
  dialogImageUrl.value = contentAnnouncement.content[num]['pictureUrl'];
  dialogVisible.value = true
}
// 重要通知
const importantInit = () => {
  importantYZM();
}
const importantYZM = () => {
  $http.get('/L/yzm').then((res:any)=>{
    importantYzm.img = 'data:image/png;base64,'+res.data['img'];
    importantYzm.text = res.data['text'];
  })
}
const importantSend = () =>{
  if (importantYzmText.value.toLowerCase() !== importantYzm.text.toLowerCase()){
    ElMessage({
      message: language.value===1?'Verification code error, please enter again':'验证码错误,请重新输入',
      type: 'warning',
    });
    importantYZM();
  }else{
    let data:string[] = [];
    if (importantParameter.content === ''){
      ElMessage({
        message: language.value===1?'The content cannot be empty':'内容不能为空',
        type: 'warning',
      });
      return;
    }
    if (importantParameter.acceptType){
      if (importantParameter.system.length===0){
        ElMessage({
          message: language.value===1?'The recipient cannot be blank':'收件人不能为空',
          type: 'warning',
        });
        return;
      }else{
        data = importantParameter.system;
      }
    }else{
      if (!/^\w{3,}(\.w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/.test(importantParameter.custom)){
        ElMessage({
          message: language.value===1?'Email format error':'电子邮件格式错误',
          type: 'warning',
        });
        return;
      }else{
        data.push(importantParameter.custom)
      }
    }
    $http.post('/L/mail',{
      content: importantParameter.content,
      recipient: data,
      uuid: $cookies.get('uuid')
    }).then((res:any)=>{
      if (res.data){
        ElMessage({
          message: language.value===1?'Send a success':'发送成功',
          type: 'success',
        });
      }else{
        ElMessage({
          message: language.value===1?'Send failure':'发送失败',
          type: 'warning',
        });
      }
    });
  }
}
const obtainUserList = () => {
  $http.get('/admin/c896d9988afd44939906b45e8703df3a',{
    params:{
      uuid: $cookies.get('uuid'),
      limit: 1000,
      page: 1
    }
  }).then((res:any)=>{
    if (res.data != null){
      let uuid = $cookies.get('uuid');
      res.data['data'].forEach((item:any)=>{
        if (item['userId'] !== uuid)
          userList.value.push(item);
      });
    }
  })
}
// 用户消息
onMounted(()=>{
  if ($cookies.get('uuid')===null){
    modifyIsLogTo(false);
  }else{
    obtainUserList();
  }
});
</script>

<style scoped lang="scss">
.message{
  width: 100%;
  height: 100%;
  .ps{
    height: 100%;
  }
  .body-left{
    width: 300px;
    height: 100%;
    background-color: #f3f6fb;
    border-radius: 20px;
    .body-left-upper{
      width: 96%;
      margin: 10px 0 0 2%;
      text-align: center;
      font-size: 30px;
    }
    .body-left-lower{
      width: 80%;
      margin: 20px 0 0 10%;
      height: calc(100% - 200px);
      background-color: white;
      border-radius: 20px;
      .ps{
        height: 100%;
      }
      .body-left-list{
        width: 96%;
        margin: 10px 0 0 2%;
        border-radius: 20px;
        text-align: center;
        font-size: 20px;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
      }
      .body-left-userMessage{
        width: 96%;
        margin: 10px 0 0 2%;
        border-radius: 20px;
        .body-left-userMessage-txt{
          width: 100%;
          font-size: 20px;
          height: 40px;
          line-height: 40px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          .rotating1{
            animation: rotating1 1s ;
            // 动画执行完后保持住
            animation-fill-mode: forwards;
          }
          .rotating2{
            transform: rotate(0deg);
          }
          @keyframes rotating1{
            form{
              transform: rotate(0deg);
            }
            to{
              transform: rotate(90deg);
            }
          }
        }
        .userMessage{
          width: 96%;
          height: 20px;
          margin: 10px 0 0 2%;
          border-radius: 20px;
          display: flex;
          cursor: pointer;
          span{
            height: 100%;
            line-height: 30px;
          }
        }
        .userMessageColor{
          background-color: #f3f6fb;
          color: black;
         }
      }
    }
  }
  .body-right{
    width: 800px;
    height: 100%;
    margin-left: 30px;
    border-radius: 20px;
    .body-right-Project-1{
      width: 100%;
      height: 100%;
      border-radius: 20px;
      background-color: #b1b4b9;
      display: flex;
      overflow: hidden;
      .announcementSetUp{
        width: 500px;
        padding-top: 10px;
        height: 90%;
        border-radius: 20px;
        margin: 3.5% 0 0 1%;
        background-color: #f3f6fb;
      }
      .announcementPreview{
        width: 250px;
        height: 400px;
        border-radius: 20px;
        margin: 10% 0 0 1%;
        background-color: white;
        .preview-content{
          width: 96%;
          margin-left: 2%;
          word-break: break-all;
        }
      }
      .announcement{
        width: 250px;
        margin-left:calc((100% - 250px)/2);
        margin-top: 20px;
        min-height: 400px;
        border-radius: 20px;
        background-color: white;
      }
    }
    .body-right-Project-2{
      width: 100%;
      height: 100%;
      border-radius: 20px;
      background-color: #b1b4b9;
      overflow: hidden;
      .important-div{
        width: 80%;
        margin:20px 0 0 10%;
      }
    }
    .body-right-Project-3{
      width: 100%;
      height: 100%;
      .chat-screen{
        width: 100%;
        height: 100%;
        background-color: black;
        border-radius: 20px;
        overflow: hidden;
      }
      .chat-screen-message{
        width: 80%;
        height: 450px;
        margin: 20px 0 0 10%;
        border-radius: 20px;
        background-color: white;
        overflow: hidden;
        .chat-screen-send{
          width: 100%;
          height: 130px;
          border-radius: 20px;
          background-color: white;
        }
      }
    }
  }
  .drawer-div{
    width: 96%;
    height: 40px;
    margin:20px 0 0 2%;
    display: flex;
    span{
      line-height: 40px;
    }
  }
  .pitch-on{
    background-color: black;
    color: white;
  }
  .uncheck{
    background-color: #b1b4b9;
  }
}
</style>
