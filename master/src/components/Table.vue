<!--
 * @Descripttion: 普通表格
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-08 06:50:24
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-07 15:54:48
 -->

<template>
  <el-table
    :data="data"
    border
    height="70vh"
    size="mini"
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    style="margin:2px 0px"
    v-loading="isLoading"
    :empty-text="emptyText"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <slot name="start"></slot>
    <el-table-column
      v-for="col in header"
      :prop="col.id"
      :key="col.id"
      :label="col.label"
      :width="col.width"
      :fixed="col.fixed"
    ></el-table-column>
    <slot name="end"></slot>
  </el-table>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "datatable",
  props: {
    data: Array,
    header: { type: Array, required: true },
    isLoading: {
      type: Boolean
    }
  },
  computed: {
    ...mapState({ emptyText: state => state.emptyMsg })
  }
};
</script>