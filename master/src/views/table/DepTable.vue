<template>
  <div style="width:100%;background:white;padding:2px;border-radius:2px">
    <!-- 选择器 -->
    <!-- 按钮组 -->
    <el-row>
      <el-button-group>
        <el-button type="primary" size="small">刷新</el-button>
        <el-button type="primary" size="small">导入</el-button>
        <el-button type="primary" size="small">导出</el-button>
        <el-button type="primary" size="small">新增</el-button>
        <el-button type="primary" size="small">删除</el-button>
      </el-button-group>
      <div style="float:right">
        <el-input placeholder="部门编号" v-model="input" maxlength="5" size="small" style="width:10rem"></el-input>
        <el-button icon="el-icon-search" circle size="small"></el-button>
      </div>
    </el-row>

    <!-- 表格 -->
    <el-row>
      <el-table :data="deptData" border lazy size="mini" fit="false">
        <el-table-column label="部门编号" style="width:1rem">
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
      </el-table>
    </el-row>
  </div>
</template>

<style lang="css">
</style>
<script>
export default {
  data() {
    return {
      input: "",
      deptData: [
        {
          deptnumber: "10001",
          deptname: "中国xx",
          parentnumber: "1",
          deptphone: "15527376176",
          deptaddr: ""
        }
      ]
    };
  }
};
</script>