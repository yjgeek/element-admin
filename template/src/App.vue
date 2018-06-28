<template>
  <div id="app">
    <router-view v-if="!auth" />
    <el-container v-else>
      <header-navigation></header-navigation>
      <el-container>
        <side-navigation></side-navigation>
        <el-main :class="['main', !isCollapse?'show':'hide']">
          <el-breadcrumb separator="/">
            <template v-for="(item, i) in breadData">
              <el-breadcrumb-item v-if="item=='首页'" to="/"  :key="i"></el-breadcrumb-item>
              <el-breadcrumb-item v-else-if="isObject(item)" :key="i"><span @click="$router.push(item.url)"></span></el-breadcrumb-item>
              <el-breadcrumb-item v-else :key="i"></el-breadcrumb-item>
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
export default {
  name: 'app',
  data () {
    return {
      auth: false,
      isCollapse: false,
      resourceDialogVisible: false,
      breadData: []
    }
  },
  components: {
    sideNavigation,
    headerNavigation
  },
  methods: {
    breadCrumb: function() {
      if (!this.auth) return false;
      let breadData = [];
      let params = this.$route.query; //获取参数
      for (let obj of this.$route.matched) {
        if (obj.meta.bread) {
          for (let value of obj.meta.bread) {
            // 判断是否有需要解析变量
            let type = null;
            if (typeof value == 'object') {
              value = JSON.stringify(value);
              type = 'object';
            }
            if (value.includes("#{")) {
              value = value.replace(/#{(.+?)}/g, function(a, key) {
                if (params[key]) {
                  return params[key];
                } else {
                  return "";
                }
              });
            }
            if (type == 'object') {
              value = JSON.parse(value);
            }
            breadData.push(value);
          }
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
        this.auth = false;
      }else{
        this.auth = true;
        this.breadCrumb();
      }
    }
  },
  watch:{
    '$route'(to, from){
      this.handleRouter()
    }
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
</style>
<style lang="scss" scoped>
.main{
  padding: 0;
  padding: 70px 10px 0 265px; 
  &.hide{
    padding-left: 73px; 
  }
  .el-breadcrumb{
    margin-bottom: 30px;
  }
}
</style>
