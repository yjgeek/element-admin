import Vue from "vue";
import Router from "vue-router";
import routes from "routers/index"
import { beforeEach } from "config/interceptors";
Vue.use(Router);
let routerInstance = new Router({
  routes
})
routerInstance.beforeEach(beforeEach);
export default routerInstance;