<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    layout="total,->, prev, pager, next, jumper,sizes"
    :total="total"
    background
  ></el-pagination>
</template>
<script>
export default {
  name:"Pagination",
  props:{
    currentPage:{
      type:Number,
      default:()=>{}
    },
    pageSizes:{
      type:Array,
      default:()=>{}
    },
     pageSize:{
      type:Number,
      default:()=>{}
    },
     total:{
      type:Number,
      default:()=>{}
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('sizeChange',val)
    },
    handleCurrentChange(val) {
      this.$emit('currentChange',val)
    }
  }
};
</script>