import { SIDE_NAV_MENU, AUTH_DEBUG } from "config/index";
export default {
  namespaced: true,
  state: {
    datas: SIDE_NAV_MENU,
    //有权限的导航 显示
    sidebarData: []
  },
  getters: {
    sidebarFilter(state) {
      let datas;
      if (AUTH_DEBUG) { 
        return state.sidebarData;
      } else {
        datas = state.datas;
        let tempArray = [];
        datas.forEach((item, i) => {
          if (item.childs) {
            if (item.childs.length) {
              tempArray.push(item);
            }
          } else {
            tempArray.push(item);
          }
        });
        return tempArray;
      }
    }
  },
  mutations: {
    sidebarData(state, data) {
      state.sidebarData = data;
    }
  },
  actions: {}
}