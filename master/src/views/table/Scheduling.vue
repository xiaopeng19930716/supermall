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
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column prop="date" label="人员编号"></el-table-column>
      <el-table-column prop="date" label="人员姓名"></el-table-column>
      <el-table-column prop="date" label="所属部门"></el-table-column>
      <el-table-column prop="date" label="排班工时"></el-table-column>
      <el-table-column prop="date" label="未来7日排班"></el-table-column>
    </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData:[],
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