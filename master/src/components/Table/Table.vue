<!--
 * @Descripttion: 普通表格
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-08 06:50:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-06-26 12:07:18
 -->

<template>
  <el-table
    :data="data"
    :border="border"
    :stripe="stripe"
    :height="height"
    size="mini"
    v-loading="isLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.8)"
  >
    <slot name="start"></slot>
    <el-table-column
      v-for="col in header"
      :prop="col.id"
      :key="col.id"
      :label="col.label"
      :width="col.width"
      :fixed="col.fixed"
      align="center"
    ></el-table-column>
    <slot name="end"></slot>
  </el-table>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Table",
  props: {
    data: Array,
    header: { type: Array, required: true },
    stripe: { type: Boolean, default: false },
    border: { type: Boolean, default: false },
    height: {
      type: String,
      default: "70vh"
    }
  },
  computed: {
    ...mapState({
      emptyText: state => state.emptyMsg,
      isLoading: state => state.loading.isLoading
    })
  }
};
</script>