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
        datas = state.sidebarData;
        console.log(datas);
      }else{
        datas = state.datas;
      }
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
      return handleNav(tempArray);
    }
  },
  mutations: {
    sidebarData(state, data) {
      state.sidebarData = data;
    }
  },
  actions: {}
}
// 遍历菜单数据，赋值唯一的index
function handleNav(data, index) {
  data.forEach((item, i) => {
    item['index'] = index ? `${index}-${i+1}`:i+1;
    if (item.childs) {
      handleNav(item.childs, item['index']);
    }
  });
  return data;
}