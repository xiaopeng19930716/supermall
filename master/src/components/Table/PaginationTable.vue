<!--
 * @Descripttion: 
 * @version: 
 * @Author: 肖鹏
 * @Date: 2020-06-14 15:28:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-06-24 22:15:42
--> 
<template>
  <el-row>
    <el-row>
      <slot name="toolbar"></slot>
    </el-row>
    <el-row>
      <el-table :data="data" :border="border" :stripe="stripe">
        <template #empty>
          <slot name="empty">暂无数据</slot>
        </template>
        <slot name="column"></slot>
      </el-table>
    </el-row>
    <el-row>
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 40, 80,100,200]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: "PaginationTable",
  props: {
    border: {
      type: Boolean,
      defaulet: false
    },
    stripe: {
      type: Boolean,
      defaulet: false
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    sizeChange: {
      type: Function,
      default: () => {}
    },
    currentChange: {
      type: Function,
      default: () => {}
    },
    data: {
      type: Array,
      default: () => []
    },
    count: {
      type: Number,
      default: 0
    },
    autoPagi: {
      type: Boolean,
      default: false
    },
    fetchData: {
      type: Function,
      default: "fetchData"
    }
  },
  computed: {
    total() {
      if (this.autoPagi) {
        return this.data.length;
      }
      return this.count;
    }
  },
  watch: {},
  created() {},
  methods: {}
};
</script>

<style lang="stylus" scoped></style>
