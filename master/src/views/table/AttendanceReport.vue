<!--
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2019-09-28 17:02:09
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-20 02:10:16
 -->
<template>
  <!-- 考勤信息 -->
  <div class="panel">
    <!-- 按钮组 输入框-->
    <el-row style="display:inline">
      <el-button type="primary" size="mini" icon="el-icon-document" @click="fileOut">导出</el-button>
      <Inputgroup @getByName="getRecordDataByNameAsync">
        <!-- 日期选择器 -->
        <template>
          <DeptPicker></DeptPicker>
          <DatePicker style="float:left" ref="datepicker"></DatePicker>
        </template>
      </Inputgroup>
    </el-row>
    <!-- 表格 -->
    <el-row>
      <Table :header="header" :data="tableData"></Table>
    </el-row>
    <!-- 分页器 -->
    <el-row>
      <Pagination
        :page-sizes="pageSizes"
        @pagesizeChange="sizeChange"
        @currentpageChange="currentChange"
      ></Pagination>
    </el-row>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
import { DeptPicker } from "container/dept/index";
import {
  Pagination,
  Inputgroup,
  Buttongroup,
  DatePicker,
  Table
} from "components/index.js";

export default {
  components: {
    Pagination,
    Inputgroup,
    Buttongroup,
    DatePicker,
    DeptPicker,
    Table
  },
  data() {
    return {
      pageSizes: [20, 40, 80, 100],
      header: [
        { id: "userid", label: "个人编号" },
        { id: "name", label: "姓名" },
        { id: "deptname", label: "部门", width: "180px" }
        // { id: "dev", label: "应到天数" },
        // { id: "dev", label: "实到天数" },
        // { id: "dev", label: "迟到" },
        // { id: "devSN", label: "旷工" },
        // { id: "serial", label: "早退" },
        // { id: "serial", label: "请假" }
      ],
      search: {
        startTime: null,
        endTime: null,
        nameOrNo: 0
      }
    };
  },
  computed: {
    ...mapState({
      tableData: state => state.record.data,
      set: state => state.set.config
    })
  },
  created() {
    this.setCurrent(1);
    this.setPageSize(20);
  },
  mounted() {
    const date = this.$refs["datepicker"].date;
    this.search.startTime = date[0];
    this.search.endTime = date[1];
    console.log(this.set);
    console.log(this.search);
    // this.getReportData.then(total => {
    //   this.setTotal(total);
    // });
  },

  methods: {
    ...mapActions(["getReportData"]),
    ...mapMutations(["setCurrent", "setTotal", "setPageSize"]),
    // 每页大小改变
    sizeChange(val) {
      this.setCurrent(1);
      this.setPageSize(val);
    },
    // 当前页改变
    currentChange(val) {
      this.setCurrent(val);
    },
    getRecordByDateAsync(startTime, endTime) {
      this.setCurrent(1);
      this.search.startTime = startTime;
      this.search.endTime = endTime;
    },
    getRecordDataByNameAsync(nameOrNo) {
      this.setCurrent(1);
      this.search.nameOrNo = nameOrNo;
    },
    fileOut() {}
  }
};
</script>