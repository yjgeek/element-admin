<template>
  <el-aside :class="['side-nav', !isCollapse?'show-side':'hide-side']">
    <div class="logo" @click="$router.push('/')">
      <img src="https://cn.vuejs.org/images/logo.png" alt=""> \{{!isCollapse?$config.TITLE:''}}
    </div>
    <el-menu :default-active="$route.path" :uniqueOpened="true" :router="true" :collapse="isCollapse" class="el-menu-vertical" background-color="#001529" text-color="#fff" active-text-color="#1890ff">
      <template v-for="(item, i) in sidebarData">
        <el-submenu :key="i" v-if="item.childs" :index="String(item.index)">
          <template slot="title">
            <icon :type="item.icon"></icon>
            <span>\{{item.text}}</span>
          </template>
          <el-menu-item v-for="(child, i) in item.childs" :key="i" :route="child.route" :index="child.path">
            <icon :type="child.icon"></icon>
            <span>\{{child.text}}</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item :route="item.route" v-else :key="i" :index="item.path">
          <icon :type="item.icon"></icon>
          <span>\{{item.text}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </el-aside>
</template>
<script>
import {cloneDeep} from 'lodash'
export default {
  name: 'side-navigation',
  data () {
    return {
      isCollapse: false
    }
  },
  computed: {
    sidebarData () {
      return this.handleNavIndex(this.$store.getters['sideNav/sidebarFilter'])
    }
  },
  methods: {
    /**
     * 赋值一个唯一的key
     */
    handleNavIndex (data, index) {
      data.forEach((item, i) => {
        item['index'] = index ? `${index}-${i + 1}` : i + 1
        if (item.childs) this.handleNavIndex(item.childs, item['index'])
      })
      return data
    }
  },
  mounted () {
    window.$variable.vbus.$on('collapseLeftNav', val => {
      this.isCollapse = val
    })
  },
  created () {
    let datas = cloneDeep(this.$store.state.sideNav.datas)
    let auth = this.auth
    datas.forEach((item, i) => {
      if (item.childs) {
        let tempArray = []
        item.childs.forEach(child => {
          // 如果没有api则不验证
          if (child.api) {
            if (auth.includes(child.api)) {
              tempArray.push(child)
            }
          } else {
            tempArray.push(child)
          }
        })
        item.childs = tempArray
      }
      if (item.api) {
        if (!auth.includes(item.api)) {
          datas.splice(i, 1)
        }
      }
    })
    this.$store.commit('sideNav/sidebarData', datas)
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
  &.hide-side{
    width: 63px !important;
    i{
      font-weight: bold;
    }
    .logo{
      width: 63px !important;
      img{
        width: 40px;
      }
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
    overflow: hidden;
    img{
      width: 40px;
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
