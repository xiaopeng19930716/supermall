<!--
 * @Descripttion: 普通表格
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-08 06:50:24
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-06-14 10:25:53
 -->

<template>
  <el-table :data="data" border :height="height" size="mini" :loading="isLoading">
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
    isLoading: {
      type: Boolean
    },
    height: {
      type: String,
      default: "70vh"
    }
  },
  computed: {
    ...mapState({ emptyText: state => state.emptyMsg })
  }
};
</script>