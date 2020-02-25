<template>
  <!-- 时间段管理 -->
  <div>
    <EditDialog :dialog="edit"></EditDialog>
    <Buttongroup>
      <template slot="end">
        <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleColumnView">隐藏字段</el-button>
      </template>
    </Buttongroup>
    <el-table :data="data" size="mini" height="70vh" border>
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column prop="quanid" label="编号" width="50" align="center"></el-table-column>
      <el-table-column label="时间段名称" fixed width="180" align="center">
        <template slot-scope="scope">
          <el-link type="primary" @click="edit(scope.row)">{{scope.row.quanname}}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="工作时间" align="center">
        <el-table-column prop="quanstart" label="上班时间" align="center"></el-table-column>
        <el-table-column prop="quanend" label="下班时间" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="允许迟到">
        <el-table-column prop="allowlate" label="分钟"></el-table-column>
      </el-table-column>
      <el-table-column prop="date" label="允许早退">
        <el-table-column prop="allowleave" label="分钟"></el-table-column>
      </el-table-column>
      <el-table-column prop="signin" label="必须签到"></el-table-column>
      <el-table-column prop="signoff" label="必须签退"></el-table-column>
      <el-table-column prop="date" label="签到时间范围(分钟)" align="center">
        <el-table-column prop="signinbefore" label="上班前" align="center"></el-table-column>
        <el-table-column prop="signinafter" label="上班后" align="center"></el-table-column>
      </el-table-column>
      <el-table-column prop="date" label="签退时间范围(分钟)" align="center">
        <el-table-column prop="signoffbefore" label="下班前" align="center"></el-table-column>
        <el-table-column prop="signoffafter" label="下班后" align="center"></el-table-column>
      </el-table-column>
      <el-table-column prop="beforeremark" label="班前记加班" width="100" align="center"></el-table-column>
      <el-table-column prop="afterremark" label="班后记加班" width="100" align="center"></el-table-column>
      <el-table-column prop="date" label="节假日休息" width="100" align="center"></el-table-column>
      <el-table-column prop="date" label="扣除休息时间" width="100" align="center"></el-table-column>
      <el-table-column prop="date" label="开始休息时间" width="100" align="center"></el-table-column>
      <el-table-column prop="date" label="结束休息时间" width="100" align="center"></el-table-column>
      <el-table-column prop="date" label="弹性时间" align="center"></el-table-column>
      <el-table-column prop="date" label="时间短时长" width="100" align="center"></el-table-column>
    </el-table>
    <Pagination
      :pageSizes="pageSizes"
      @pagesizeChange="pageSizeChange"
      @currentpageChange="currentPageChange"
    ></Pagination>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { Pagination, DeleteDialog, Buttongroup } from "components/index.js";
import { AddDialog, EditDialog } from "container/quantum/index";
export default {
  components: {
    Buttongroup,
    Pagination,
    AddDialog,
    EditDialog,
    DeleteDialog
  },
  data() {
    return {
      edit: {
        visible: true,
        title: "编辑时间段",
        width: "70vw"
      },
      pageSizes: [10, 20, 40, 80]
    };
  },
  computed: {
    ...mapState({ data: state => state.quan.quanData })
  },
  created() {
    this.setPageSize(20);
    this.getQuanData();
  },
  methods: {
    ...mapMutations(["setPageSize", "setCurrent", "setTotal"]),
    ...mapActions(["getQuanData"]),
    pageSizeChange() {},
    currentPageChange() {},
    handleColumnView() {}
  }
};
</script>