<template>
  <el-aside :class="['side-nav', !isCollapse?'show':'hide']">
    <div class="logo" @click="$router.push('/')"> 
      <img src="https://cn.vuejs.org/images/logo.png" alt="">
      \{{!isCollapse?'后台管理系统':''}}
    </div>
    <el-menu
      :default-active="$route.path"
      :uniqueOpened="true"
      :router="true"
      :collapse="isCollapse"
      class="el-menu-vertical"
      background-color="#001529"
      text-color="#fff"
      active-text-color="#1890ff">
      <template v-for="(item, i) in sidebarData">
        <el-submenu 
          :key="i"
          v-if="item.childs"
          :index="String(item.index)">
          <template slot="title">
            <icon :type="item.icon"></icon>
            <span>\{{item.text}}</span>
          </template>
          <el-menu-item v-for="(child, i) in item.childs" :key="i" :index="child.path">
            <icon :type="child.icon"></icon>
            <span>\{{item.text}}</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else :key="i" :index="item.path">
            <icon :type="item.icon"></icon>
            <span>\{{item.text}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </el-aside>
</template>
<script>
import Vue from 'vue';
export default {
  name: 'side-navigation',
  data () {
    return {
      isCollapse: false
    }
  },
  computed: {
    sidebarData () {
      return this.$store.getters['sideNav/sidebarFilter']
    }
  },
  methods: {
    //遍历出api
    filterApi (datas) {
      let tempArray = []
      datas.forEach(item => {
        if (typeof item.childs === 'object') {
          tempArray = [...tempArray, ...this.filterApi(item.childs)]; 
        }else{
          if (item.api) {
            tempArray.push(item.api)
          }
        }
      });
      return tempArray
    },
  },
  mounted(){
    GLOBAL.vbus.$on('collapseLeftNav', val=>{
      this.isCollapse = val;
    });
  },
  created(){
    // 处理菜单权限的
    // let datas = JSON.parse(JSON.stringify(this.$store.state.sideNav.datas));
    // let apis = this.filterApi(datas);
    // this.$api["publicHandlePermissions"]({ data: apis }).then(res=>{
    //   Vue.prototype.auth = Object.keys(res);
    //   datas.forEach((item, i)=>{
    //     if (item.childs) {
    //       let tempArray = [];
    //       item.childs.forEach(child=>{
    //         if (child.api) {
    //           if (res[child.api] == true) {
    //             tempArray.push(child);
    //           }
    //         }else{
    //           tempArray.push(child);
    //         }
    //       })
    //       item.childs = tempArray;
    //     }
    //     if (item.api) {
    //       if (!res[item.api]) {
    //         datas.splice(i,1)
    //       }
    //     }
    //   })
    //   this.$store.commit('sideNav/sidebarData', datas)
    // })
  }
}
</script>
<style lang="scss" scoped>
.side-nav{
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 6;
  overflow-x: hidden;
  background: #001529;
  width: 255px !important;
  padding-top: 60px;
  box-sizing: border-box;
  transition: width .4s;
  &.hide{
    width: 63px !important;
    i{
      font-weight: bold;
    }
    .logo{
      width: 63px !important;
    }
  }
  .logo{
    height: 60px;
    width: 255px;
    line-height: 60px;
    background: #002140;
    padding-left: 10px;
    color: #fff;
    font-weight: 600;
    font-size: 22px;
    z-index: 7;
    transition: width .4s;
    cursor: pointer;
    box-sizing: border-box;
    display: inline-block;
    position: fixed;
    top: 0;
    left: 0; 
    img{
      width: 35px;
      vertical-align: middle;
    }
  }
  .el-menu-vertical{
    border: none;
  }
  .el-submenu {
    &.is-opened{
      >ul>li{
        background-color: #000c17 !important;
      }
    }
    i{
      font-size: 18px;
      font-style: normal;
      color: rgba(255, 255, 255, .6);
    }
  }
  .el-menu-item i{
    margin-right: 5px;
  }
  .el-menu-item.is-active i{
    color: #1890ff;
  }
  .el-menu-item:hover{
    background-color: rgba(114, 114, 212, 0.222) !important;
    i,span{
      color: #1890ff !important;
    }
  }
}
</style>
