<template>
  <!-- 考勤统计 -->
  <div class="panel">
    <!-- 面包屑导航 -->
    <!-- <Breadcrumb></Breadcrumb> -->
    <!-- 按钮组 -->
    <el-row>
      <Buttongroup>
        <el-button type="primary" size="mini" icon="el-icon-document" @click="fileout">导出</el-button>
      </Buttongroup>
      <Inputgroup>
        <!-- <el-select v-model="select.value" size="mini" placeholder="选择部门" @change="selectChange">
          <el-option
            v-for="item in select.options"
            :key="item.deptnumber"
            :label="item.deptname"
            :value="item.deptnumber"
          ></el-option>
        </el-select> -->
      </Inputgroup>
    </el-row>
    <!-- 表格 -->
    <el-row>
      <el-table
        id="reportable"
        :data="table.tableData"
        size="mini"
        height="70vh"
        border
        class="table"
      >
        <el-table-column prop="deptname" label="部门名称"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="id" label="账号"></el-table-column>
        <el-table-column prop="deptperson" label="应到次数"></el-table-column>
        <el-table-column prop="deptperson" label="实到次数"></el-table-column>
        <el-table-column prop="deptphone" label="迟到"></el-table-column>
        <el-table-column prop="deptphone" label="早退"></el-table-column>
        <el-table-column prop="deptphone" label="旷工"></el-table-column>
        <el-table-column prop="deptphone" label="请假"></el-table-column>
        <el-table-column prop="deptphone" label="出差"></el-table-column>
      </el-table>
    </el-row>
    <!-- 分页器 -->
    <Pagination
      :current-page="pagination.currentPage"
      :page-sizes="pagination.pageSizes"
      :page-size="pagination.pageSize"
      :total="pagination.total"
      @pagesizeChange="sizeChange"
      @currentpageChange="currentChange"
    ></Pagination>
  </div>
</template>

<script>
import { getData } from "network/axios.js";
import { leadin, leadout } from "assets/js/common/filesaver";
import {
  Breadcrumb,
  Pagination,
  Inputgroup,
  Buttongroup,
  Editdialog
} from "components/index.js";

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
      bread: {
        blist: []
      },
      //输入搜索
      input: "",
      // 分页器设置
      pagination: {
        currentPage: 1,
        pageSizes: [50, 100, 200, 400],
        pageSize: 50,
        total: 0
      },
      table: {
        index: 0,
        allData: [],
        tableData: [],
        multipleSelection: []
      }
    };
  },
  beforeMount() {
    // API接收数据
    // const option = "/department/get";
    // const params = {
    //   deptnumber: "1",
    //   fetch_child: 1
    // };
    getData(option, params, res => {
      this.table.allData = res.data.data.items;
      this.pagination.total = res.data.data.count;
      this.table.tableData = this.table.allData.slice(
        0,
        this.pagination.pageSize
      );
    });
  },

  methods: {
    // 编辑
    handleEdit(index, row) {
      this.dialog.editvisible = true;
      this.table.index = index;
      // 不能直接赋值 需要拷贝对象
      const string = JSON.stringify(row);
      this.editform = JSON.parse(string);
    },
    // 删除
    handleDelete(index, row) {
      console.log(index, row);
      this.table.index = index;
      this.dialog.delvisible = true;
      this.dialog.alertMsg = row.deptname;
    },
    cancel() {
      this.dialog.editvisible = false;
      this.dialog.delvisible = false;
      this.dialog.addvisible = false;
    },
    makesure() {
      // 本地更新
      this.table.tableData[this.table.index] = this.input.form;
      this.$message("更新部门信息成功");
      this.dialog.editvisible = false;
    },
    confirm() {
      // 本地删除
      delete this.table.tableData[this.table.index];
      this.$message("删除成功");
      this.dialog.delvisible = false;
    },
    // 每页大小改变
    sizeChange(val) {
      this.pagination.currentPage = 1;
      this.table.tableData = this.table.allData.slice(0, val);
      this.pagination.pageSize = val;
    },
    // 当前页改变
    currentChange(val) {
      this.pagination.currentPage = val;
      this.table.tableData = this.table.allData.slice(
        (this.pagination.currentPage - 1) * this.pagination.pageSize,
        this.pagination.currentPage * this.pagination.pageSize
      );
    },
    add() {
      this.dialog.addvisible = true;
      this.table.tableData.push(this.addform);
    },
    filein() {
      leadin("deptable");
    },
    fileout() {
      leadout("reportable", "考勤表");
    }
  }
};
</script>
