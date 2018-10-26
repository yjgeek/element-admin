import Vue from 'vue'
import App from './App'
import store from './store'
import inject from './plugins/inject'
import router from './plugins/router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'

Vue.use(ElementUI)
Vue.use(inject);

Vue.config.productionTip = false
window.GLOBAL = {};
GLOBAL.vbus = new Vue();
GLOBAL.vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})