import api from "./api";
import mixin from "./mixin";
export default {
  install: (Vue)=>{
    document.title = config.TITLE;
    Vue.prototype.$config = config;
    Vue.prototype.$auth = localStorage.auth ? JSON.parse(localStorage.auth):[];
    Vue.prototype.$api = api;
    
    // 3. 注入mixin
    Vue.mixin(mixin)
    
    //注册一个全局自定义指令
    Object.keys(directive).forEach(key=>{
      Vue.directive(key, directive[key]);
    })
  }
}