<template>
  <div style="width:100%;background:white;padding:2px;border-radius:2px">
    <!-- 对话框 -->
    <Editdialog></Editdialog>
    <!-- 面包屑导航 -->
    <Breadcrumb></Breadcrumb>
    <!-- 按钮组 -->
    <el-row style="display:inline">
      <Buttongroup></Buttongroup>
      <Inputgroup></Inputgroup>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData" height="30rem" border size="mini">
      <el-table-column label="部门编号" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.deptnumber}}</span>
        </template>
      </el-table-column>

      <el-table-column label="部门名称" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.deptname}}</span>
        </template>
      </el-table-column>

      <el-table-column label="上级部门" width>
        <template slot-scope="scope">
          <span>{{ scope.row.parentnumber}}</span>
        </template>
      </el-table-column>

      <el-table-column label="部门负责人" width>
        <template slot-scope="scope">
          <span>{{ scope.row.deptperson}}</span>
        </template>
      </el-table-column>

      <el-table-column label="部门电话" width>
        <template slot-scope="scope">
          <span>{{ scope.row.deptphone}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <Pagination
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :total="total"
      @pagesizeChange="sizeChange"
      @currentpageChange="currentChange"
    ></Pagination>
  </div>
</template>

<script>
import {
  Breadcrumb,
  Pagination,
  Inputgroup,
  Buttongroup,
  Editdialog
} from "components/index.js";
import { getData } from "network/axios.js";
export default {
  components: {
    Breadcrumb,
    Pagination,
    Inputgroup,
    Buttongroup,
    Editdialog
  },
  data() {
    return {
      currentPage: 1,
      pageSizes: [50, 100, 200, 400],
      pageSize: 50,
      total: 0,
      input: "", //输入搜索
      allData:[],
      tableData: [
        {
          deptnumber: "",
          deptname: "",
          parentnumber: "",
          deptperson: ""
        }
      ],
      multipleSelection: []
    };
  },
  beforeMount() {
    // 接收数据
    const option = "/department/get";
    const params = {
      deptnumber: "1",
      fetch_child: 1
    };
    getData(option, params, res => {
      this.allData = res.data.data.items;
      this.total = res.data.data.count;
      this.tableData = this.allData.slice(0, this.pageSize);
    });
  },

  methods: {
    // 编辑
    handleEdit(index, row) {
      console.log(index, row);
    },
    // 删除
    handleDelete(index, row) {
      console.log(index, row);
    },
    // 每页大小改变
    sizeChange(val) {
      this.currentPage = 1;
      this.tableData= this.allData.slice(0, val);
      this.pageSize = val;
    },
    // 当前页改变
    currentChange(val) {
      this.currentPage = val;
      this.tableData = this.allData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    }
  }
};
</script>