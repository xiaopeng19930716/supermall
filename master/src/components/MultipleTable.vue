<template>
  <!-- 人员排班 -->
  <el-table
    :data="tableData"
    size="mini"
    ref="multipleTable"
    @selection-change="handleSelectionChange"
    height="70vh"
    border
  >
    <el-table-column type="selection" width="35"></el-table-column>
    <el-table-column
      v-for="col in tableHeader"
      :prop="col.id"
      :key="col.id"
      :label="col.label"
      :width="col.width"
    ></el-table-column>
    <slot name="end"></slot>
  </el-table>
</template>
<script>
export default {
  props: {
    tableHeader: Array,
    tableData: Array
  },
  data() {
    return {
      multipleSelection: []
    };
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>