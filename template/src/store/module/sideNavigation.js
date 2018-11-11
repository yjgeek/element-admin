import { SIDE_NAV_MENU, AUTH_DEBUG } from 'config/index'
export default {
  namespaced: true,
  state: {
    datas: SIDE_NAV_MENU,
    // 有权限的导航 显示
    sidebarData: []
  },
  getters: {
    sidebarFilter (state) {
      let datas
      if (AUTH_DEBUG) {
        datas = state.sidebarData
        let tempArray = []
        datas.forEach((item, i) => {
          if (item.childs) {
            if (item.childs.length) {
              tempArray.push(item)
            }
          } else {
            tempArray.push(item)
          }
        })
        return tempArray
      } else {
        return state.datas
      }
    }
  },
  mutations: {
    sidebarData (state, data) {
      state.sidebarData = data
    }
  },
  actions: {}
}
