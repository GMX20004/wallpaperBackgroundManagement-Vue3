<template>
  <div class="user" v-loading="mainLoading">
    <div class="main-body">
      <span class="body-left">
        <div class="user-list">
          <div style="width: 100%;height: calc(100% - 16px);margin-top: 8px" v-loading="userListLoading">
            <el-scrollbar style="height: 100%">
            <div class="user-information" v-for="(item,i) in userList" tabindex="-1" :key="i" @focus="userFocus(i)" :class="[item['isFocus']?'userColor':'']">
              <el-avatar style="width: 30px;height: 30px;margin: 5px 0 0 10px" :src="headPortrait+item['headPortrait']"/>
              <span style="width: 10%;">{{item['name']}}</span>
              <span style="color: #8d8d8d;width: 30%;">{{item['email']}}</span>
              <span style="color: #8d8d8d;width: calc(10% - 20px);">{{item['sex']}}</span>
              <span style="color: #8d8d8d;width: 50%;">最近登入时间：{{item['recentLogin']}}</span>
            </div>
          </el-scrollbar>
          </div>
        </div>
        <div class="user-list-paging">
          <el-pagination
            v-model:currentPage="userListPaging.page"
            v-model:page-size="userListPaging.pageSize"
            :page-sizes="[10, 20, 30, 40]"
            layout="total, sizes, pager, next"
            :total="userListPaging.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </span>
      <span v-if="userList[userIsFocus]" class="body-right">
        <div  style="width: 100%;height: 50%;overflow: hidden">
          <div style="width: 96%;margin-left: 2%;text-align: right;height: 15%">
            <el-dropdown trigger="click" placement="bottom-end" @command="handleCommand">
                <svg style="margin-top: 5px;cursor:pointer;" t="1657871751755" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3823" width="30" height="30">
                  <path d="M415.930119 223.790358c0-52.980346 43.003528-95.983874 95.983874-95.983874s95.983874 43.003528 95.983874 95.983874-43.003528 95.983874-95.983874 95.983874S415.930119 276.770704 415.930119 223.790358z" p-id="3824"></path>
                  <path d="M415.930119 511.741979c0-52.980346 43.003528-95.983874 95.983874-95.983874s95.983874 43.003528 95.983874 95.983874-43.003528 95.983874-95.983874 95.983874S415.930119 564.722325 415.930119 511.741979z" p-id="3825"></path>
                  <path d="M415.930119 799.865614c0-52.980346 43.003528-95.983874 95.983874-95.983874s95.983874 43.003528 95.983874 95.983874-43.003528 95.983874-95.983874 95.983874S415.930119 852.673946 415.930119 799.865614z" p-id="3826"></path>
                </svg>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item :command="1">{{store.state['language']===1?'Modify information':'修改信息'}}</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
          </div>
          <div style="width: 96%;margin-left: 2%;text-align: center;height: 45%">
             <el-avatar style="width: 100px;height: 100px;" :src="headPortrait+userList[userIsFocus]['headPortrait']"/>
          </div>
          <div style="width: 96%;margin-left: 2%;text-align: center;font-size: 30px;height: 20%">{{userList[userIsFocus]['name']}}</div>
          <div style="width: 96%;margin-left: 2%;text-align: center;height: 20%;">
            <el-tag class="ml-2" type="danger">{{store.state['language']===1?'praise':'获赞'}}:{{userList[userIsFocus]['praise']}}</el-tag>
            <el-tag class="ml-2" type="warning">{{store.state['language']===1?'fans':'粉丝'}}:{{userList[userIsFocus]['fans']}}</el-tag>
            <el-tag class="ml-2" type="info">{{store.state['language']===1?'attention':'关注'}}:{{userList[userIsFocus]['focusOn']}}</el-tag>
            <el-tag>{{store.state['language']===1?'contribute':'投稿'}}:{{userList[userIsFocus]['contribute']}}</el-tag>
          </div>
        </div>
        <div style="width: 100%;height: 50%">
          <div class="body-right-text">{{store.state['language']===1?'gender':'性别'}}：{{userList[userIsFocus]['sex']}}</div>
          <el-tooltip
            class="box-item"
            effect="dark"
            :content="userList[userIsFocus]['instructions']"
            placement="top"
          >
            <div class="body-right-text">{{store.state['language']===1?'Individuality signature':'个性签名'}}：{{userList[userIsFocus]['instructions'].length>8?userList[userIsFocus]['instructions'].slice(0,8)+'...':userList[userIsFocus]['instructions']}}</div>
          </el-tooltip>
          <div class="body-right-text">{{store.state['language']===1?'email':'邮箱'}}：{{userList[userIsFocus]['email']}}</div>
          <div class="body-right-text">{{store.state['language']===1?'Last login time':'最后登入时间'}}：{{userList[userIsFocus]['recentLogin']}}</div>
          <div class="body-right-text">{{store.state['language']===1?'Creation time':'创建时间'}}：{{userList[userIsFocus]['creationTime']}}</div>
        </div>
      </span>
    </div>
    <el-dialog v-model="dialogVisible" :title="store.state['language']===1?'Modify information':'修改信息'" width="700px">
      <div style="height: 100px;width: 100%;text-align: center">
        <el-upload
          :auto-upload="false"
          class="upload-demo"
          accept=".jpg,.png,.jpeg,.gif,.webp"
          :show-file-list="false"
          list-type="picture"
          :on-change="updateChange"
          action="#">
          <el-avatar style="width: 100px;height: 100px;" :src="modifyParameter.imgSrc"/>
        </el-upload>
      </div>
      <el-form label-width="150px" style="margin-top: 20px">
        <el-form-item :label="store.state['language']===1?'Nickname':'昵称'">
          <el-input v-model="modifyParameter.name"></el-input>
        </el-form-item>
        <el-form-item :label="store.state['language']===1?'Individuality signature':'个性签名'">
          <el-input v-model="modifyParameter.signature"></el-input>
        </el-form-item>
        <el-form-item :label="store.state['language']===1?'Modify the reason':'修改原因'">
          <el-input v-model="modifyParameter.reason"></el-input>
        </el-form-item>
      </el-form>
      <div style="width: 100%;text-align: center">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" :disabled="store.state['permissions']['modifyingUserInformation']===0" @click="modifySubmit">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
/**
 * 接口区
 */
interface modifyInterfacer{
  imgSrc: string,
  name: string,
  signature: string,
  reason: string,
  file: any
}
/**
 * 变量区
 */
const proxy = inject("proxy");
const { $imgUrl } = proxy as any;
const { $http } = proxy as any;
const { $cookies } = proxy as any;
const store = useStore();
const mainLoading = ref<boolean>(false);
const headPortrait = $imgUrl+'/headPortrait/';
const userIsFocus = ref<number>(0);
const userListLoading = ref<boolean>(false);
const userList = ref<any>([]);
const userListPaging = ref<any>({
  page:1,
  pageSize: 10,
  total: 0
});
const dialogVisible = ref(false);
const modifyParameter = reactive<modifyInterfacer>({
  imgSrc: '',
  name: '',
  signature: '',
  reason: '',
  file: null
});
/**
 * 方法区
 */
const init = async () => {
  mainLoading.value = true;
  getUserList();
  mainLoading.value = false;
}
const userFocus = (val:number) => {
  userList.value[userIsFocus.value]['isFocus'] = false;
  userIsFocus.value = val;
  userList.value[val]['isFocus'] = true;
}
const handleSizeChange = (val:number) => {
  userListPaging.value.pageSize = val;
  getUserList();
}
const handleCurrentChange = (val:number) => {
  userListPaging.value.page = val;
  getUserList();
}
const handleCommand = (command: number) => {
  switch (command){
    case 1:
      modifyParameter.imgSrc = headPortrait+userList.value[userIsFocus.value]['headPortrait'];
      modifyParameter.name = userList.value[userIsFocus.value]['name'];
      modifyParameter.signature = userList.value[userIsFocus.value]['instructions'];
      modifyParameter.reason = '';
      modifyParameter.file = null;
      dialogVisible.value = true;
      break;
    case 2:
      break;
  }
}
const getUserList = () => {
  userListLoading.value = true;
  $http.get('/admin/c896d9988afd44939906b45e8703df3a',{
    params:{
      identity:1,
      uuid:$cookies.get('uuid'),
      page: userListPaging.value.page,
      limit: userListPaging.value.pageSize
    }
  }).then((res:any)=>{
    userList.value= res.data['data'];
    for(let i=0;i<userList.value.length;i++){
      if (i===0)userList.value[i]['isFocus'] = true;
      else userList.value[i]['isFocus'] = false;
    }
    userListPaging.value.total = res.data['total'];
    userListLoading.value = false;
  });
}
const updateChange = (file: any, fileList: any) => {
  if (!/\.(jpg|png|jpeg|gif|webp)$/.test(file.name)) {
    ElMessage.error(store.state['language']===1?'File format error':'文件格式错误');
    fileList.splice(0, 1);
    return;
  }else{
    if (file.size>512000){
      ElMessage.error(store.state['language']===1?' File size is greater than 500kb':'文件大于500kb');
      fileList.splice(0, 1);
    }else{
      if (fileList.length>1) fileList.splice(0, 1);
      modifyParameter.imgSrc = file.url;
      modifyParameter.file = file;
    }
  }
}
const modifySubmit = () => {
  let data = new FormData;
  if (modifyParameter.file !== null) data.append('file',modifyParameter.file['raw']);
  data.append('userId',userList.value[userIsFocus.value]['id']);
  data.append('name',modifyParameter.name);
  data.append('instructions',modifyParameter.signature);
  data.append('uuid',$cookies.get('uuid'));
  $http.post('User/userModify',data).then((res:any)=>{
    if (res.data){
      ElMessage({
        message: store.state['language']===1?'Modify the success':'修改成功',
        type: 'success',
      });
      getUserList();
      dialogVisible.value = false;
    }else{
      ElMessage.error(store.state['language']===1?'Failure':'失败');
    }
  });
}
onMounted(()=>{
  if ($cookies.get('uuid')!==null){
    init();
  }
});
</script>

<style scoped lang="scss">
.user{
  width: 100%;
  height: 100%;
  display: flex;
  .main-body{
    width: 100%;
    height: 100%;
    display: flex;
    .body-left{
      width: calc(70% - 20px);
      height: 100%;
      .user-list{
        width: 100%;
        height: 80%;
        border-radius: 20px;
        border: 1px solid #b1b4b9;
        .user-information{
          width: 100%;
          height: 40px;
          border-radius: 50px;
          margin-bottom: 10px;
          cursor:pointer;
          display: flex;
          span{
            text-align: center;
            line-height: 40px;
          }
        }
      }
      .user-list-paging{
        width: 100%;
        margin-top:20px;
        ::v-deep .el-pagination{
          justify-content: center;
        }
      }
    }
    .body-right{
      width: 30%;
      height: 100%;
      margin-left: 20px;
      border-radius: 20px;
      background-color: #f3f6fb;
      overflow: hidden;
      .body-right-text{
        width: 96%;
        height: 20%;
        margin-left: 2%;
        color: #8d8d8d;
      }
    }
  }
  .userColor{
    background-color: #f3f6fb;
  }
}
</style>
