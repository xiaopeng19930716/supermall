<!--
 * @Descripttion: 公用组件分页器
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2019-09-21 21:46:46
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-04-01 10:57:26
 -->
<template>
  <!-- 分页器 -->
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
import { mapState, mapMutations } from "vuex";
export default {
  name: "Pagination",
  props: {
    pageSizes: {
      type: Array,
      default: () => {}
    }
  },
  computed: {
    ...mapState({
      currentPage: state => state.pagi.current,
      pageSize: state => state.pagi.pageSize,
      total: state => state.pagi.total
    })
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("pagesizeChange", val);
    },
    handleCurrentChange(val) {
      this.$emit("currentpageChange", val);
    }
  }
};
</script>