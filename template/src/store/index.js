import Vue from 'vue'
import Vuex from 'vuex'
import SideNav from './modules/sideNavigation'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    sideNav: SideNav
  }
})