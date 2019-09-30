<template>
  <div>
    <el-tabs :tab-position="tabPosition" type="card" style="height:45.5rem;background:white">
      <el-tab-pane label="时间段管理">
        <el-table
          :data="tableData"
          size="mini"
          ref="multipleTable"
          @selection-change="handleSelectionChange"
          border
          style="text-align:center"
        >
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column prop="date" label="编号" width="55"></el-table-column>
          <el-table-column prop="date" label="名称" fixed width="100"></el-table-column>
          <el-table-column prop="date" label="工作时间">
            <el-table-column prop="date" label="上班时间"></el-table-column>
            <el-table-column prop="date" label="下班时间"></el-table-column>
          </el-table-column>
          <el-table-column prop="date" label="允许迟到">
            <el-table-column prop="date" label="分钟"></el-table-column>
          </el-table-column>
          <el-table-column prop="date" label="允许早退">
            <el-table-column prop="date" label="分钟"></el-table-column>
          </el-table-column>
          <el-table-column prop="date" label="必须签到"></el-table-column>
          <el-table-column prop="date" label="必须签退"></el-table-column>
          <el-table-column prop="date" label="签到时间范围(分钟)">
            <el-table-column prop="date" label="上班前"></el-table-column>
            <el-table-column prop="date" label="上班后"></el-table-column>
          </el-table-column>
          <el-table-column prop="date" label="签退时间范围(分钟)">
            <el-table-column prop="date" label="下班前"></el-table-column>
            <el-table-column prop="date" label="下班后"></el-table-column>
          </el-table-column>
          <el-table-column prop="date" label="班前记加班"></el-table-column>
          <el-table-column prop="date" label="班后记加班"></el-table-column>
          <el-table-column prop="date" label="节假日休息"></el-table-column>
          <el-table-column prop="date" label="扣除休息时间"></el-table-column>
          <el-table-column prop="date" label="开始休息时间"></el-table-column>
          <el-table-column prop="date" label="结束休息时间"></el-table-column>
          <el-table-column prop="date" label="弹性时间"></el-table-column>
          <el-table-column prop="date" label="时间短时长"></el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="班次管理">
        <el-table
          :data="tableData"
          size="mini"
          ref="multipleTable"
          @selection-change="handleSelectionChange"
          border
          style="text-align:center"
        >
          <el-table-column prop="date" label="班次名称"></el-table-column>
          <el-table-column prop="date" label="班次编号"></el-table-column>
          <el-table-column prop="date" label="开始日期"></el-table-column>
          <el-table-column prop="date" label="结束日期"></el-table-column>
          <el-table-column prop="date" label="周期单位"></el-table-column>
          <el-table-column prop="date" label="周期数"></el-table-column>
          <el-table-column prop="date" label="添加时段"></el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="人员排班">
        <el-table
          :data="tableData"
          size="mini"
          ref="multipleTable"
          @selection-change="handleSelectionChange"
          border
          style="text-align:center"
        >
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column prop="date" label="人员编号"></el-table-column>
          <el-table-column prop="date" label="人员姓名"></el-table-column>
          <el-table-column prop="date" label="所属部门"></el-table-column>
          <el-table-column prop="date" label="排班工时"></el-table-column>
          <el-table-column prop="date" label="未来7日排班"></el-table-column>
        </el-table>
      </el-tab-pane>
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