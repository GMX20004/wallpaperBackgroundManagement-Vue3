<template>
  <div class="user">
    <perfect-scrollbar>
      <div class="main-body">
        <span class="body-left">
          <div class="user-list">
            <div style="width: 100%;height: calc(100% - 16px);margin-top: 8px">
              <perfect-scrollbar>
              <div class="user-information" v-for="(item,i) in userList" tabindex="-1" :key="i" @focus="userFocus(i)" :class="[item['isFocus']?'userColor':'']">
                <el-avatar style="width: 30px;height: 30px;margin: 5px 0 0 10px" :src="headPortrait+item['headPortrait']"/>
                <span style="width: 10%;">{{item['name']}}</span>
                <span style="color: #8d8d8d;width: 30%;">{{item['mail']}}</span>
                <span style="color: #8d8d8d;width: calc(10% - 40px);">{{item['sex']}}</span>
                <span style="color: #8d8d8d;width: 50%;">最近登入时间：{{item['time']}}</span>
              </div>
            </perfect-scrollbar>
            </div>
          </div>
          <div class="user-list-paging">
            <el-pagination
              v-model:currentPage="userListPaging.page"
              v-model:page-size="userListPaging.pageSize"
              :page-sizes="[10, 20, 30, 40]"
              layout="total, sizes, pager, next"
              :total="400"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </span>
        <span class="body-right">
          <div style="width: 100%;height: 50%;overflow: hidden">
            <div style="width: 96%;margin-left: 2%;text-align: right;height: 15%">
              <el-dropdown trigger="click" placement="bottom-end" @command="handleCommand">
                  <svg style="margin-top: 5px;cursor:pointer;" t="1657871751755" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3823" width="30" height="30">
                    <path d="M415.930119 223.790358c0-52.980346 43.003528-95.983874 95.983874-95.983874s95.983874 43.003528 95.983874 95.983874-43.003528 95.983874-95.983874 95.983874S415.930119 276.770704 415.930119 223.790358z" p-id="3824"></path>
                    <path d="M415.930119 511.741979c0-52.980346 43.003528-95.983874 95.983874-95.983874s95.983874 43.003528 95.983874 95.983874-43.003528 95.983874-95.983874 95.983874S415.930119 564.722325 415.930119 511.741979z" p-id="3825"></path>
                    <path d="M415.930119 799.865614c0-52.980346 43.003528-95.983874 95.983874-95.983874s95.983874 43.003528 95.983874 95.983874-43.003528 95.983874-95.983874 95.983874S415.930119 852.673946 415.930119 799.865614z" p-id="3826"></path>
                  </svg>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item :command="1">{{language===1?'Send message':'发送消息'}}</el-dropdown-item>
                      <el-dropdown-item :command="2">{{language===1?'Blacklisted':'列入黑名单'}}</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
            </div>
            <div style="width: 96%;margin-left: 2%;text-align: center;height: 45%">
               <el-avatar style="width: 100px;height: 100px;" :src="headPortrait+userList[userIsFocus]['headPortrait']"/>
            </div>
            <div style="width: 96%;margin-left: 2%;text-align: center;font-size: 30px;height: 20%">{{userList[userIsFocus]['name']}}</div>
            <div style="width: 96%;margin-left: 2%;text-align: center;height: 20%;">
              <el-tag class="ml-2" type="danger">{{language===1?'praise':'获赞'}}:1000</el-tag>
              <el-tag class="ml-2" type="warning">{{language===1?'fans':'粉丝'}}:1000</el-tag>
              <el-tag class="ml-2" type="info">{{language===1?'attention':'关注'}}:1000</el-tag>
              <el-tag>{{language===1?'contribute':'投稿'}}:1000</el-tag>
            </div>
          </div>
          <div style="width: 100%;height: 50%">
            <div class="body-right-text">{{language===1?'gender':'性别'}}：{{userList[userIsFocus]['sex']}}</div>
            <el-tooltip
              class="box-item"
              effect="dark"
              :content="userList[userIsFocus]['instructions']"
              placement="top"
            >
              <div class="body-right-text">{{language===1?'Individuality signature':'个性签名'}}：{{userList[userIsFocus]['instructions'].length>8?userList[userIsFocus]['instructions'].slice(0,8)+'...':userList[userIsFocus]['instructions']}}</div>
            </el-tooltip>
            <div class="body-right-text">{{language===1?'email':'邮箱'}}：{{userList[userIsFocus]['mail']}}</div>
            <div class="body-right-text">{{language===1?'Last login time':'最后登入时间'}}：{{userList[userIsFocus]['time']}}</div>
            <div class="body-right-text">{{language===1?'Creation time':'创建时间'}}：{{userList[userIsFocus]['time']}}</div>
          </div>
        </span>
      </div>
    </perfect-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
/**
 * 变量区
 */
const proxy = inject("proxy");
const { $imgUrl } = proxy as any;
const { $cookies } = proxy as any;
const modifyIsLogTo:any = inject('modifyIsLogTo');
const headPortrait = $imgUrl+'/headPortrait/';
let language:any = inject('language');
const userIsFocus = ref<number>(0);
const userList = ref<any>([
  {headPortrait:'24.png',name:'ccc',sex:'男',time:'2022-07-07 10:40',mail:'1478588530@qq.com',isFocus: false,instructions: '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊'},
  {headPortrait:'0.png',name:'aaa R',sex:'男',time:'2022-07-07 10:40',mail:'1478588530@qq.com',isFocus: false,instructions: '水水水水水水水水水水水水水水水水水水水'},
  {headPortrait:'0.png',name:'ddd R',sex:'男',time:'2022-07-07 10:40',mail:'1478588530@qq.com',isFocus: false,instructions: '踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩从'},
  {headPortrait:'24.png',name:'eee R',sex:'男',time:'2022-07-07 10:40',mail:'1478588530@qq.com',isFocus: false,instructions: '顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶'},
  {headPortrait:'0.png',name:'xxx R',sex:'男',time:'2022-07-07 10:40',mail:'1478588530@qq.com',isFocus: false,instructions: '日日日日日日日日日日日日日日日日日日日'},
  {headPortrait:'0.png',name:'vvv R',sex:'男',time:'2022-07-07 10:40',mail:'1478588530@qq.com',isFocus: false,instructions: '她她她她她她她她她她她她她她她她她她她'},
  {headPortrait:'0.png',name:'qqq R',sex:'男',time:'2022-07-07 10:40',mail:'1478588530@qq.com',isFocus: false,instructions: '嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'},
  {headPortrait:'0.png',name:'www R',sex:'男',time:'2022-07-07 10:40',mail:'1478588530@qq.com',isFocus: false,instructions: '呱呱呱呱呱呱呱呱呱呱呱呱呱呱呱古古怪怪'},
  {headPortrait:'0.png',name:'eee R',sex:'男',time:'2022-07-07 10:40',mail:'1478588530@qq.com',isFocus: false,instructions: '钱钱钱钱钱钱钱钱钱钱钱钱钱钱钱钱钱钱钱'},
  {headPortrait:'0.png',name:'rrr R',sex:'男',time:'2022-07-07 10:40',mail:'1478588530@qq.com',isFocus: false,instructions: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈'}
]);
const userListPaging = ref<any>({
  page:1,
  pageSize: 10
});
/**
 * 方法区
 */
const userFocus = (val:number) => {
  userList.value[userIsFocus.value]['isFocus'] = false;
  userIsFocus.value = val;
  userList.value[val]['isFocus'] = true;
}
const handleSizeChange = (val:number) => {
  userListPaging.value.pageSize = val;
}
const handleCurrentChange = (val:number) => {
  userListPaging.value.page = val;
}
const handleCommand = (command: number) => {
  console.log(command);
}
onMounted(()=>{
  if ($cookies.get('uuid')===null){
    modifyIsLogTo(false);
  }
});
</script>

<style scoped lang="scss">
.user{
  width: 100%;
  height: 100%;
  .ps{
    width: 100%;
    height: 100%;
  }
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
        .ps{
          height: 100%;
        }
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
