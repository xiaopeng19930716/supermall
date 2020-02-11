<template>
  <!-- 表格 -->
  <el-table
    :data="data"
    border
    height="70vh"
    size="mini"
    default-expand-all="true"
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
  >
    <el-table-column
      v-for="col in header"
      :prop="col.id"
      :key="col.id"
      :label="col.label"
      :width="col.width"
    ></el-table-column>
    <slot></slot>
  </el-table>
</template>
<script>
export default {
  name: "datatable",
  props: {
    data: { type: Array, required: true },
    header: { type: Array, required: true }
  }
};
</script>