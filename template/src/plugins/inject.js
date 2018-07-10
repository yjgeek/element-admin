import api from "./api";
import mixin from "./mixin";
export default {
  install: (Vue)=>{
    Vue.prototype.auth = [];
    Vue.prototype.$api = api;
    // 3. 注入组件
    Vue.mixin(mixin)
  }
}