<template>
  <div class="message">
    <perfect-scrollbar>
      <span class="body-left">
      <div class="body-left-upper">
        <el-avatar style="width: 100px;height: 100px;" :src="headPortrait+user['headPortrait']"/>
        <div style="margin-top: 10px"><b>{{user['name']}}</b></div>
      </div>
      <div class="body-left-lower">
        <perfect-scrollbar>
          <div class="body-left-list pitch-on">系统公告</div>
          <div class="body-left-list uncheck">重要通知</div>
          <div class="body-left-userMessage uncheck">
            <svg style="margin-top: 10px" t="1658201440980" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2517" width="20" height="20">
              <path d="M300.860952 965.241905A48.761905 48.761905 0 0 1 270.140952 877.714286l454.704762-365.714286L270.140952 146.285714a48.761905 48.761905 0 1 1 61.196191-75.824762l501.76 403.504762a48.761905 48.761905 0 0 1 0 75.824762L331.337143 954.270476a48.761905 48.761905 0 0 1-30.476191 10.971429z" p-id="2518"></path>
            </svg>
            <span>
              用户消息
            </span>

          </div>
          <div class="body-left-userMessage-list">
            <div class="userMessage" v-for="(item,i) in userList" tabindex="-1" :key="i" @focus="userFocus(i)">
              <el-avatar style="width: 20px;height: 20px;" :src="headPortrait+item['headPortrait']"/>
            </div>
          </div>
        </perfect-scrollbar>
      </div>
    </span>
      <span class="body-right"></span>
    </perfect-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { inject, reactive, ref } from "vue";

/**
 * 变量区
 */
const proxy = inject("proxy");
const { $imgUrl } = proxy as any;
const headPortrait = $imgUrl+'/headPortrait/';
const user = reactive<any>({
  headPortrait:'24.png',
  name:'aaa R'
});
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
/**
 * 方法区
 */
const userFocus = (val:number) => {
  userList.value[userIsFocus.value]['isFocus'] = false;
  userIsFocus.value = val;
  userList.value[val]['isFocus'] = true;
}
// let language:any = inject('language');
</script>

<style scoped lang="scss">
.message{
  width: 100%;
  height: 100%;
  .ps{
    height: 100%;
    display: flex;
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
        font-size: 20px;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
        display: flex;
        justify-content: center;
      }
      .body-left-userMessage-list{
        width: 70%;
        margin-left: 30%;
        background-color: #f3f6fb;
        .userMessage{

        }
      }
    }
  }
  .body-right{

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
