<!--
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2019-09-28 17:02:09
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-25 12:54:22
 -->
<template>
  <!-- 考勤信息 -->
  <div class="panel">
    <!-- 按钮组 输入框-->
    <el-row style="display:inline">
      <Buttongroup>
        <el-button type="primary" size="mini" icon="el-icon-document" @click="fileOut">导出</el-button>
      </Buttongroup>
      <Inputgroup @getByName="getRecordDataByNameAsync">
        <!-- 日期选择器 -->
        <DateTimePicker @dateChange="getRecordByDateAsync" ref="datepicker"></DateTimePicker>
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
import {
  Pagination,
  Inputgroup,
  Buttongroup,
  DateTimePicker,
  Table
} from "components/index.js";

export default {
  components: {
    Pagination,
    Inputgroup,
    Buttongroup,
    DateTimePicker,
    Table
  },
  data() {
    return {
      pageSizes: [20, 40, 80, 100],
      header: [
        { id: "userid", label: "个人编号" },
        { id: "name", label: "姓名" },
        { id: "deptname", label: "部门", width: "180px" },
        { id: "record", label: "打卡时间", width: "180px" },
        { id: "serial", label: "流水号" },
        { id: "dev", label: "打卡设备" },
        { id: "devSN", label: "设备序列号" },
        { id: "status", label: "考勤状态" }
      ],
      search: {
        startTime: null,
        endTime: null,
        nameOrNo: 0
      }
    };
  },
  created() {
    this.setCurrent(1);
    this.setPageSize(20);
  },
  mounted() {
    const date = this.$refs["datepicker"].date;
    this.search.startTime = date[0];
    this.search.endTime = date[1];
    this.getRecordDataByDate(this.search).then(total => {
      this.setTotal(total);
    });
  },
  computed: {
    ...mapState({ tableData: state => state.record.data })
  },
  methods: {
    ...mapActions(["getRecordDataByDate"]),
    ...mapMutations(["setCurrent", "setTotal", "setPageSize"]),
    // 每页大小改变
    sizeChange(val) {
      this.setCurrent(1);
      this.setPageSize(val);
      this.getRecordDataByDate(this.search).then(total => {
        this.setTotal(total);
      });
    },
    // 当前页改变
    currentChange(val) {
      this.setCurrent(val);
      this.getRecordDataByDate(this.search).then(total => {
        this.setTotal(total);
      });
    },
    getRecordByDateAsync(startTime, endTime) {
      this.setCurrent(1);
      this.search.startTime = startTime;
      this.search.endTime = endTime;
      this.getRecordDataByDate(this.search).then(total => {
        this.setTotal(total);
      });
    },
    getRecordDataByNameAsync(nameOrNo) {
      this.setCurrent(1);
      this.search.nameOrNo = nameOrNo;
      this.getRecordDataByDate(this.search).then(total => {
        this.setTotal(total);
      });
    },
    fileOut() {}
  }
};
</script>