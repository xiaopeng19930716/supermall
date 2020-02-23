<template>
  <!-- 表格 -->
  <el-table
    :data="data"
    border
    height="70vh"
    size="mini"
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    style="margin:2px 0px"
    v-loading="loading"
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
export default {
  name: "datatable",
  props: {
    data: { type: Array, required: true },
    header: { type: Array, required: true }
  },
  data() {
    return {
      loading: false
    };
  },
};
</script>