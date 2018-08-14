<template>
  <div id="app">
    <router-view v-if="!isAuth" />
    <el-container v-else>
      <header-navigation></header-navigation>
      <el-container>
        <side-navigation></side-navigation>
        <el-main :class="['main', !isCollapse?'show-main':'hide-main']">
          <el-breadcrumb separator="/">
            <template v-for="(item, i) in breadData">
              <el-breadcrumb-item v-if="item=='首页'" to="/"  :key="i">\{{item}}</el-breadcrumb-item>
              <el-breadcrumb-item v-else-if="isObject(item)" :key="i"><span class="breadcrumb-a" @click="$router.push({name:item.url})">{{item.text}}</span></el-breadcrumb-item>
              <el-breadcrumb-item v-else :key="i">\{{item}}</el-breadcrumb-item>
            </template>
          </el-breadcrumb>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import sideNavigation from 'components/SideNavigation'
import headerNavigation from 'components/HeaderNavigation'
import {debounce} from 'lodash'
import {analysisStr} from 'utils/index'
export default {
  name: 'app',
  data () {
    return {
      isAuth: false,
      isCollapse: false,
      breadData: []
    }
  },
  methods: {
    breadCrumb: function() {
      if (!this.isAuth) return false;
      let breadData = [];
      let params = Object.assign({},this.$route.query,this.$route.params); //获取参数
      for (let obj of this.$route.matched) {
        if (obj.meta.bread) {
          let data = analysisStr(obj.meta.bread, params);
          breadData = [...breadData, ...data];
        }
      }
      this.breadData = breadData;
    },
    isObject(val){
      if (typeof val == 'object') {
        return true;
      }else{
        return false;
      }
    },
    handleRouter(){
      let $route = this.$route;
      if(($route.fullPath == '/' && !$route.name) || $route.meta.auth===false){
        this.isAuth = false;
      }else{
        this.isAuth = true;
        this.breadCrumb();
      }
    }
  },
  watch:{
    $route:{
      handler(to, from){
        this.handleRouter()
      },
      immediate: true
    }
  },
  components: {
    sideNavigation,
    headerNavigation
  },
  mounted(){
    GLOBAL.vbus.$on('collapseLeftNav', val=>{
      this.isCollapse = val;
    });
  },
  created () {
    this.handleRouter()
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body, html, ul, p{
  margin: 0;
  padding: 0;
}
ul{
  list-style: none;
}
a{
  text-decoration: none;
  color: #606266;
}
.el-input__icon, .icon{
  font-style: normal;
  font-size: 22px; 
  position: relative;
  &.phone, &.user{
    top: -2px;
  }
}
::-webkit-scrollbar-track-piece {
  width: 6px;
  background: #424f63;
  border: 0;
  border-radius: 3px;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  border: 0;
  background: #424f63;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background-color: #65cea7;
  border: 0;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #57be98
}

.img-thumbnail {
  display: inline-block;
  max-width: 100%;
  height: auto;
  padding: 4px;
  line-height: 1.42857143;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: all .2s ease-in-out;
}
body .el-table th.gutter {
  display: table-cell!important;
}
</style>
<style lang="scss" scoped>
.main{
  padding: 0;
  padding: 70px 10px 0 265px; 
  &.hide-main{
    padding-left: 73px; 
  }
  .el-breadcrumb{
    margin-bottom: 30px;
    .breadcrumb-a{
      cursor: pointer;
      &:hover{
        color: #1890ff;
      }
    }
  }
}
</style>
