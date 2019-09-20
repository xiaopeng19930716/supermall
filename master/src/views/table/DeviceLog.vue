<template>
  <el-table 
  :data="deptData" 
  border
  lazy
  size="small"
  style="width: 100%">
    <el-table-column label="部门编号">
      <template slot-scope="scope">
        <span>{{scope.row.deptnumber}}</span>
      </template>
    </el-table-column>

    <el-table-column label="部门名称">
      <template slot-scope="scope">
        <span>{{ scope.row.deptname}}</span>
      </template>
    </el-table-column>

    <el-table-column label="上级部门">
      <template slot-scope="scope">
        <span>{{ scope.row.parentnumber}}</span>
      </template>
    </el-table-column>

    <el-table-column label="负责人电话">
      <template slot-scope="scope">
        <span>{{ scope.row.deptphone}}</span>
      </template>
    </el-table-column>
    <el-table-column label="部门地址">
      <template slot-scope="scope">
        <span>{{ scope.row.deptaddr}}</span>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style lang="css">
</style>
<script>
export default {
  data() {
    return {
      deptData: [
         {
          deptnumber: "10001",
          deptname: "王小虎",
          parentnumber: "1",
          deptphone: "15527376176",
          deptaddr:""
        },
      ]
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>