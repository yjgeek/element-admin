<template>
  <el-dialog 
    :title="dialogParams.title?dialogParams.title:'添加数据'"
    :visible.sync="visible" @close="$router.back()">
    <slot></slot>
    <div v-if="operating" style="text-align: center">
      <el-button type="danger" @click="$router.back()">取消</el-button>
      <el-button type="primary" @click="$emit('submit');">提交</el-button>
    </div>
  </el-dialog>
</template>
<script>
import analysis from 'utils/analysisStr'
export default {
  name: 'strong-dialog',
  props: {
    value: Boolean,
    operating: {
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
        title: '添加数据',
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
          this.dialogParams = analysis(to.meta.dialog, to.params)
        }
      },
      immediate: true
    }
  },
}
</script>

