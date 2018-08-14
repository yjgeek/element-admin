<template>
  <el-header :class="['header-navigation', isShowSide?'hide-nav':'show']">
    <div class="logo" @click="collapse"><icon :type="isShowSide?'fold-right':'fold-left'"></icon></div>
    <div class="right">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
<<<<<<< HEAD
          \{{name}}<i class="el-icon-arrow-down el-icon--right"></i>
=======
          \{{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
>>>>>>> 627912eb37fbec673df5bf84acd5429caf49dba4
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>修改密码</el-dropdown-item>
          <el-dropdown-item divided ><p @click="logout">退出登录</p></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>
<script>
import { debounce } from "lodash";
export default {
  name: 'header-navigation',
  data () {
    return {
      isShowSide: false,
      name: '超级管理员'
    }
  },
  methods: {
    logout () {
      this.$api['authLogout']().then(res=>{
        localStorage.clear();
        this.$router.push('/login');
      })
    },
    //隐藏/显示左侧导航
    collapse(){
      // 通过全局的vbus来分发事件
      this.isShowSide = !this.isShowSide;
      GLOBAL.vbus.$emit('collapseLeftNav', this.isShowSide); 
    },
    /**
     * 窗口改变大小
     */
    changeWindow() {
      let isShowSide = this.isShowSide;
      this.$store.commit('updateWindowSize', window.innerWidth)
      if (window.innerWidth > 991) {
        this.isShowSide = false;
        GLOBAL.vbus.$emit("collapseLeftNav", false);
      } else {
        this.isShowSide = true;
        GLOBAL.vbus.$emit("collapseLeftNav", true);
      }
    }
  },
  mounted() {
    window.onresize = debounce(this.changeWindow, 300, { maxWait: 600 });
    this.$nextTick(()=>{
      this.changeWindow()
    })
  },
  created(){
    this.name = this.getLocalStorage('user', true).name;
  }
};
</script>
<style lang="scss" scoped>
.el-header.header-navigation {
  background: #fff;
  position: fixed;
  display: flex;
  justify-content: space-between;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px !important;
  line-height: 60px;
  z-index: 5;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding-left: 255px !important;
  &.hide-nav {
    padding-left: 63px !important;
  }
  .logo {
    padding: 0 15px;
    cursor: pointer;
    &:hover {
      background: #dff8f5;
    }
    i {
      font-size: 26px;
      color: #000;
    }
  }
  .el-dropdown-link {
    color: #000;
    cursor: pointer;
  }
  .right {
    display: flex;
    align-items: center;
    > * {
      margin-right: 5px;
    }
  }
}
</style>
