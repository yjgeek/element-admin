import Vue from 'vue'
import Vuex from 'vuex'
import SideNav from './module/sideNavigation'
Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    windowSize: 0
  },
  mutations:{
    updateWindowSize(state,data){
      state.windowSize = data;
    }
  },
  modules: {
    sideNav: SideNav
  }
})