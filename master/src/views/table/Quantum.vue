<template>
  <!-- 时间段管理 -->
  <div>
    <Buttongroup></Buttongroup>
    <el-table :data="table" size="mini" height="70vh" border>
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column prop="date" label="编号" width="50" align="center"></el-table-column>
      <el-table-column prop="date" label="名称" fixed width="80" align="center"></el-table-column>
      <el-table-column prop="date" label="工作时间" align="center">
        <el-table-column prop="date" label="上班时间" align="center"></el-table-column>
        <el-table-column prop="date" label="下班时间" align="center"></el-table-column>
      </el-table-column>
      <el-table-column prop="date" label="允许迟到">
        <el-table-column prop="date" label="分钟"></el-table-column>
      </el-table-column>
      <el-table-column prop="date" label="允许早退">
        <el-table-column prop="date" label="分钟"></el-table-column>
      </el-table-column>
      <el-table-column prop="date" label="必须签到"></el-table-column>
      <el-table-column prop="date" label="必须签退"></el-table-column>
      <el-table-column prop="date" label="签到时间范围(分钟)" align="center">
        <el-table-column prop="date" label="上班前" align="center"></el-table-column>
        <el-table-column prop="date" label="上班后" align="center"></el-table-column>
      </el-table-column>
      <el-table-column prop="date" label="签退时间范围(分钟)" align="center">
        <el-table-column prop="date" label="下班前" align="center"></el-table-column>
        <el-table-column prop="date" label="下班后" align="center"></el-table-column>
      </el-table-column>
      <el-table-column prop="date" label="班前记加班" width="100" align="center"></el-table-column>
      <el-table-column prop="date" label="班后记加班" width="100" align="center"></el-table-column>
      <el-table-column prop="date" label="节假日休息" width="100" align="center"></el-table-column>
      <el-table-column prop="date" label="扣除休息时间" width="100" align="center"></el-table-column>
      <el-table-column prop="date" label="开始休息时间" width="100" align="center"></el-table-column>
      <el-table-column prop="date" label="结束休息时间" width="100" align="center"></el-table-column>
      <el-table-column prop="date" label="弹性时间" align="center"></el-table-column>
      <el-table-column prop="date" label="时间短时长" width="100" align="center"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { Buttongroup } from "../../components/index";
export default {
  components: {
    Buttongroup
  },
  data() {
    return {
      tableData: []
    };
  }
};
</script>