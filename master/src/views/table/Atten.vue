<template>
  <div>
    <el-table
      :data="tableData"
      size="mini"
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
  </div>
</template>
<script>
export default {
   data() {
  return {
    tableData:[]
  }
},
}
</script>