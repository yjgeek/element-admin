<template>
  <div class="strong-list">
    <div class="header" v-if="$slots.operating">
      <slot name="operating"></slot>
    </div>
    <div class="filter" v-if="$slots.filter">
      <el-form :inline="true" size="small">
        <fieldset>
          <legend>筛选</legend>
          <slot name="filter"></slot>
          <el-form-item>
            <el-button type="primary" @click="handleFilter">查询</el-button>
          </el-form-item>
        </fieldset>
      </el-form>
    </div>
    <div class="table-list"  v-loading="loading">
      <slot name="list" :data="listData"></slot>
    </div>
    <div class="page" v-if="isPage">
      <el-pagination
        :page-size="limit"
        background
        @current-change="handlePage"
        layout="prev, pager, next, total, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: 'strong-list',
  props: {
    filter: {
      type: Object,
      default(){
        return {}
      }
    },
    getData: {
      type: Function
    },
    isPage: {
      type: Boolean,
      default(){
        return true;
      }
    }
  },
  data(){
    return {
      page: 1,
      limit: 15,
      total: 0,
      listData: [],
      loading: false
    }
  },
  methods:{
    updateData(){
      let params = Object.assign({}, this.filter, {
        page: this.page,
        limit: this.limit
      })
      if (this.getData) {
        this.loading = true;
        this.getData(params, res=>{
          if (this.isPage) {
            this.page = res.current_page;
            this.total = res.total;
            this.listData = res.data;
          }else{
            this.listData = res;
          }
          this.loading = false;
        })
      }
    },
    // 筛选
    handleFilter(){
      this.updateData();
    },

    // 分页改变
    handlePage(page){
      this.page = page;
      this.updateData();
    }
  },
  created(){
    this.updateData();
  }
}
</script>

<style lang="scss" scoped>
.strong-list{

 > div {
   padding: 10px 0;
 }
 .filter{
   fieldset{
     border: 1px dashed #eee;
     legend{
       color: #888;
       padding: 0 10px;
     }
   }
   .el-form-item{
     margin-bottom: 10px;
   }

 }
 .page{
   text-align: center;
 }
}
</style>
