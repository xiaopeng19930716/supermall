<template>
<!-- 考勤信息 -->
  <div class="panel">
    <!-- 面包屑导航 -->
    <!-- <Breadcrumb></Breadcrumb> -->
    <!-- 按钮组 输入框-->
    <el-row style="display:inline">
      <Buttongroup>
        <el-button type="primary" size="mini" icon="el-icon-document" @click="leadout">导出</el-button>
      </Buttongroup>
      <Inputgroup @search="search">
        <!-- 日期选择器 -->
        <Datepicker @datePicked="getDate($event)" @getDate="getDate($event)"></Datepicker>
      </Inputgroup>
    </el-row>
    <!-- 表格 -->
    <el-row>
      <el-table
        id="table-content"
        ref="multipleTable"
        :data="table.tableData"
        empty-text="玩命加载中..."
        size="mini"
        height="70vh"
        border
       class="table"
      >
        <!-- <el-table-column type="selection" width="35"></el-table-column> -->
        <el-table-column prop="pin" label="人员编号" width="120"></el-table-column>
        <el-table-column prop="ename" label="人员姓名" width="120"></el-table-column>
        <el-table-column prop="deptname" label="所属部门" width="180"></el-table-column>
        <el-table-column prop="checktime" label="打卡时间" width="180"></el-table-column>
        <el-table-column prop="alias" label="打卡设备" width="100"></el-table-column>
        <el-table-column prop="sn" label="设备序列号"></el-table-column>
        <el-table-column prop="id" label="流水号"></el-table-column>
      </el-table>
    </el-row>
    <!-- 分页器 -->
    <el-row>
      <Pagination
        :current-page="pagination.currentPage"
        :page-sizes="pagination.pageSizes"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        @pagesizeChange="sizeChange"
        @currentpageChange="currentChange"
      ></Pagination>
    </el-row>
  </div>
</template>

<script>
import {
  Breadcrumb,
  Pagination,
  Inputgroup,
  Buttongroup,
  Editdialog,
  Datepicker
} from "components/index.js";
import { getData } from "network/axios.js";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  components: {
    Breadcrumb,
    Pagination,
    Inputgroup,
    Buttongroup,
    Editdialog,
    Datepicker
  },
  data() {
    return {
      select: {
        value: "",
        options: []
      },
      bread: {
        blist: []
      },
      input: {
        labelPosition: "left"
      },
      pagination: {
        currentPage: 1,
        pageSizes: [50, 100, 200, 400],
        pageSize: 100,
        total: 0
      },
      table: {
        index: 0,
        allData: [],
        tableData: []
      },
      params: {
        key: "48ebcni1xafyxlez7zmfs5sja55dibrmvkaerkcgznky",
        starttime: "",
        endtime: "",
        pin: "",
        sn: "",
        id: "",
        number: 500
      },
    };
  },
  mounted() {
    // 接收考勤数据
    const option = "/transaction/get";
    const params = this.params;
    console.log(params);
    getData(
      option,
      params,
      res => {
        this.table.allData = res.data.data.items;
        this.pagination.total = res.data.data.count;
        this.table.tableData = this.table.allData.slice(
          0,
          this.pagination.pageSize
        );
      },
      err => console.log(err)
    );
  },
  methods: {
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
    // 导出
    leadout() {
      let et = XLSX.utils.table_to_book(
        document.getElementById("table-content")
      ); //此处传入table的DOM节点
      let etout = XLSX.write(et, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([etout], {
            type: "application/octet-stream"
          }),
          "trade-publish.xlsx"
        ); //trade-publish.xlsx 为导出的文件名
      } catch (e) {
        console.log(e, etout);
      }
      return etout;
    },
    getDate(date) {
      this.params.starttime = date[0];
      this.params.endtime = date[1];
    },
    search(val) {
      console.log(val);
      this.params.pin = val.toString();
      const option = "/transaction/get";
      const params = this.params;
      getData(
        option,
        params,
        res => {
          this.table.allData = res.data.data.items;
          this.pagination.total = res.data.data.count;
          this.table.tableData = this.table.allData.slice(
            0,
            this.pagination.pageSize
          );
        },
        err => alertr("编号或姓名不正确")
      );
    }
  }
};
</script>