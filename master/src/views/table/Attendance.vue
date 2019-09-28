<template>
  <div style="width:100%;background:white;padding:2px;border-radius:2px">
    <!-- 面包屑导航 -->
    <!-- <Breadcrumb></Breadcrumb> -->
    <!-- 按钮组 输入框-->
    <el-row style="display:inline">
      <Buttongroup>
        <el-button type="primary" size="mini" icon="el-icon-document" @click="leadout">导出</el-button>
      </Buttongroup>
      <Inputgroup>
        <!-- 日期选择器 -->
        <Datepicker @datePicked="datePicked"></Datepicker>
        <!-- 部门选择 -->
        <el-select v-model="select.value" size="mini" placeholder="选择部门" @change="selectChange">
          <el-option
            v-for="item in select.options"
            :key="item.deptnumber"
            :label="item.deptname"
            :value="item.deptnumber"
          ></el-option>
        </el-select>
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
        height="40.5rem"
        border
        style="margin:2px 1px"
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
        labelPosition: "left",
        form: {},
        add: {
          pin: "",
          name: "",
          DeptName: "",
          telephone: "",
          email: ""
        },
        input: "" //输入搜索
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
        starttime: "2019-09-01 00:00:01",
        endtime: "2019-09-28 00:00:01",
        pin: "",
        sn: "",
        id: "",
        number: 2000
      }
    };
  },
  beforeMount() {
    // 接收k考勤数据
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
      err => console.log(err)
    );
  },
  // 人员数据加载完成获取不同部门
  mounted() {
    const option = "/department/get";
    const params = {
      deptnumber: "1",
      fetch_child: 1
    };
    getData(option, params, res => {
      this.select.options = res.data.data.items;
    });
  },
  methods: {
    // 编辑
    handleEdit(index, row) {
      this.dialog.editvisible = true;
      this.table.index = index;
      // 不能直接赋值 需要拷贝对象
      let string = JSON.stringify(row);
      this.input.form = JSON.parse(string);
    },
    // 删除
    handleDelete(index, row) {
      this.table.index = index;
      this.dialog.delvisible = true;
      this.dialog.alertMsg = row.name;
    },
    cancel() {
      this.dialog.editvisible = false;
      this.dialog.delvisible = false;
      this.dialog.addvisible = false;
    },
    makesure() {
      // 本地更新
      this.table.tableData[this.table.index] = this.input.form;
      this.$message("更新人员信息成功");
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
    // 选择部门
    selectChange() {
      this.params.deptnumberlist = this.select.value;
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
        err => console.log(err)
      );
    },
    datePicked(date) {
      // console.log(date)
      // console.log(date[0].getFullYear()+"-"+date[0].getMonth()+"-"+date[0].getDate()+" "
      // +date[0].getHours()+":"+date[0].getMinutes()+":"+date[0].getSeconds())
      const starttime = date[0];
      const endtime = date[1];
      var y = date[0].getFullYear();
      var m = date[0].getMonth() + 1;
      var d = date[0].getDate();
      var h = date[0].getHours();
      var mm = date[0].getMinutes();
      var s = date[0].getSeconds();
      m = m < 10 ? "0" + m : m;
      d = d < 10 ? "0" + d : d;
      h = h < 10 ? "0" + h : h;
      mm = mm < 10 ? "0" + mm : mm;
      s = s < 10 ? "0" + s : s;
      date[0] = y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + s;
      console.log(date[0]);
    }
  }
};
</script>