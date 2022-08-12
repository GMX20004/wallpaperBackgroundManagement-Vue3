import { createStore } from 'vuex';

export default createStore({
  state: {
    language: 1,// 语言
    permissions:{},// 权限
    userInformation:{}// 登录人信息
  },
  getters: {},
  mutations: {
    modifyLanguage(state,{ val }){
      state.language = val;
    },
    modifyPermissions(state,{ val }){
      state.permissions = val;
    },
    modifyUserInformation(state,{ val }){
      state.userInformation = val;
    }
  },
  actions: {},
  modules: {}
});
