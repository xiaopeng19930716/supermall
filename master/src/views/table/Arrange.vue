<template>
  <div>
    <el-tabs :tab-position="tabPosition" type="card" style="height:40.5rem;background:white">
      <el-tab-pane label="时间段管理">
        <el-table
          :data="tableData"
          size="mini"
          ref="multipleTable"
          @selection-change="handleSelectionChange"
          border
          style="width: 100%"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="date" label="编号" width="150"></el-table-column>
          <el-table-column prop="date" label="名称" width="150"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="班次管理">班次管理</el-tab-pane>
      <el-tab-pane label="人员排班">人员排班</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
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