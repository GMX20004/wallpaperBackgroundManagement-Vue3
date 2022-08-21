import { createStore } from 'vuex';

export default createStore({
  state: {
    uuid: '',
    displayMode: false,
    nightColor: '#7a7a7a',
    language: 1,// 语言
    permissions:{},// 权限
    userInformation:{},// 登录人信息
    announcement:{// 系统公告
      is: false,
      title: '',
      time: null,
      content:[]
    }
  },
  getters: {},
  mutations: {
    modifyUUID(state,{ val }){
      state.uuid = val;
    },
    modifyDisplayMode(state,{ val }){
      state.displayMode = val;
    },
    modifyLanguage(state,{ val }){
      state.language = val;
    },
    modifyPermissions(state,{ val }){
      state.permissions = val;
    },
    modifyUserInformation(state,{ val }){
      state.userInformation = val;
    },
    modifyAnnouncement(state,{is,title,time,content}){
      state.announcement.is = is;
      state.announcement.title = title;
      state.announcement.time = time;
      state.announcement.content = content;
    }
  },
  actions: {},
  modules: {}
});
