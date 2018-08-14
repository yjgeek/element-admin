<template>
  <el-dialog 
    class="strong-dialog"
    :title="dialogParams.title?dialogParams.title:'添加数据'"
    :visible.sync="visible" @close="isBack?$router.back():''">
    <slot :params="dialogParams"></slot>
    <div v-if="operating" style="text-align: center">
      <el-button type="danger" @click="isBack?$router.back():''">\{{cancelText}}</el-button>
      <el-button type="primary" @click="$emit('submit');">\{{okText}}</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {analysisStr} from 'utils/index'
export default {
  name: 'strong-dialog',
  props: {
    value: Boolean,
    title: String, //弹出标题
    // 提交按钮的文字
    okText: {
      type: String,
      default(){
        return '提交'
      }
    },
    //取消按钮的文字
    cancelText: {
      type: String,
      default(){
        return '取消'
      }
    },
    //是否显示操作按钮
    operating: {
      type: Boolean,
      default(){
        return true;
      }
    },
    //是否返回上一页
    isBack: {
      type: Boolean,
      default(){
        return true;
      }
    }
  },
  data(){
    return {
      visible: this.value,
      dialogParams:{
        title: this.title?this.title:'添加数据',
      },
    }
  },
  watch:{
    visible(val){
      this.$emit('input')
    },
    $route:{
      handler(to, from){
        if (to.meta.dialog) {
          this.dialogParams = analysisStr(to.meta.dialog, to.params)
        }
      },
      immediate: true
    }
  }
}
</script>
<style lang="scss">
@media (max-width: 768px) {
  .strong-dialog .el-dialog{
    width: 95%;
  }
}
</style>


