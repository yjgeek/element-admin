<template>
  <el-header :class="['header-navigation', isShowSide?'hide':'show']">
    <div class="logo" @click="collapse"><icon :type="isShowSide?'fold-right':'fold-left'"></icon></div>
    <div class="right">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          {{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
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
export default {
  name: 'header-navigation',
  data () {
    return {
      isShowSide: false,
      userName: '管理员'
    }
  },
  methods: {
    logout () {
      localStorage.clear();
      this.$router.push('/login');
    },
    //隐藏/显示左侧导航
    collapse(){
      // 通过全局的vbus来分发事件
      this.isShowSide = !this.isShowSide;
      GLOBAL.vbus.$emit('collapseLeftNav', this.isShowSide); 
    }
  },
  created(){
    this.userName = this.getLocalStorage('user', true).name;
  }
};
</script>
<style lang="scss" scoped>
  .el-header.header-navigation{
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
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    padding-left: 255px !important;
    &.hide{
      padding-left: 63px !important;
    }
    .logo{
      padding: 0 15px;
      cursor: pointer;
      &:hover{
        background: #dff8f5;
      }
      i{
        font-size: 26px;
        color: #000;
      }
    }
    .el-dropdown-link{
      color: #000;
      cursor: pointer;
    }
    .right{
      display: flex;
      align-items: center;
      > * {
        margin-right: 5px;
      }
    }
  }
</style>
