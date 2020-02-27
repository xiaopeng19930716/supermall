<template>
  <!-- 时间段管理 -->
  <div>
    <DeleteDialog :dialog="del"></DeleteDialog>
    <AddDialog :dialog="add" :quan="quantum" @onSubmit="insertQuantum"></AddDialog>
    <AddDialog :dialog="edit" :quan="quantum" @onSubmit="updateQuantum"></AddDialog>
    <el-button-group>
      <el-button type="primary" size="mini" @click="handleDelete">删除</el-button>
      <el-button type="primary" size="mini" @click="handleFileOut">导出</el-button>
      <el-button type="primary" size="mini" @click="handleAdd">增加</el-button>
      <el-button type="primary" size="mini" @click="handleColumnView">隐藏字段</el-button>
    </el-button-group>
    <el-table :data="tableData" size="mini" height="70vh" border>
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column prop="quanid" label="编号" width="50" align="center" fixed></el-table-column>
      <el-table-column label="时间段名称" fixed width="180" align="center">
        <template slot-scope="scope">
          <el-link type="primary" @click="handleEdit(scope.row)">{{scope.row.quanname}}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="deptname" label="所属部门" width="100" align="center"></el-table-column>
      <el-table-column label="工作时间" align="center">
        <el-table-column prop="quanstart" label="上班时间" align="center"></el-table-column>
        <el-table-column prop="quanend" label="下班时间" align="center"></el-table-column>
      </el-table-column>
      <el-table-column prop="allowlate" label="允许迟到" center></el-table-column>
      <el-table-column prop="allowleave" label="允许早退" center></el-table-column>
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
      <el-table-column label="节假日休息" width="100" align="center"></el-table-column>
      <el-table-column prop="rest" label="扣除休息时间" width="100" align="center"></el-table-column>
      <el-table-column prop="firststart" label="开始休息时间1" width="100" align="center"></el-table-column>
      <el-table-column prop="firstend" label="结束休息时间1" width="100" align="center"></el-table-column>
      <el-table-column prop="secondstart" label="开始休息时间2" width="100" align="center"></el-table-column>
      <el-table-column prop="secondend" label="结束休息时间2" width="100" align="center"></el-table-column>
      <el-table-column prop="overtime" label="是否记加班" align="center"></el-table-column>
      <el-table-column prop="ovetimebefore" label="班前（分钟）记加班" width="100" align="center"></el-table-column>
      <el-table-column prop="ovetimeafter" label="班后（分钟）记加班" width="100" align="center"></el-table-column>
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
import { Pagination, DeleteDialog } from "components/index.js";
import { AddDialog } from "container/quantum/index";
export default {
  components: {
    Pagination,
    AddDialog,
    DeleteDialog
  },
  data() {
    return {
      edit: {
        visible: false,
        title: "编辑时间段",
        width: "850px"
      },
      add: {
        visible: false,
        title: "增加时间段",
        width: "850px"
      },
      del: {
        visible: false,
        title: "提示"
      },
      quantum: {},
      pageSizes: [10, 20, 40, 80]
    };
  },
  computed: {
    ...mapState({ tableData: state => state.quan.quanData })
  },
  created() {
    this.setPageSize(20);
    this.getQuanData();
  },
  methods: {
    ...mapMutations(["setPageSize", "setCurrent", "setTotal"]),
    ...mapActions(["getQuanData", "updateQuan", "insertQuan"]),
    pageSizeChange() {},
    currentPageChange() {},
    handleAdd() {
      this.quantum = {
        quanname: null,
        deptname: "总公司",
        quanstart: null,
        quanend: null,
        allowlate: 0,
        allowleave: 0,
        rest: 0,
        firststart: "11:30:00",
        firstend: "12:30:00",
        secondstart: "17:30:00",
        secondend: "18:30:00",
        overtime: ["1", "2"],
        overtimeafter: 60,
        overtimebefore: 60,
        signin: 1,
        signinafter: 150,
        signinbefore: 150,
        signoff: 1,
        signoffafter: 150,
        signoffbefore: 150
      };
      this.add.visible = true;
    },
    insertQuantum(val) {
      this.insertQuan(val).then(res => {
        if (res) {
          this.$message({
            message: "增加成功",
            type: "success"
          });
          this.add.visible = false;
        } else {
          this.$message({
            message: "添加失败",
            type: "warning"
          });
        }
      });
    },
    handleEdit(val) {
      this.edit.visible = true;
      this.quantum = JSON.parse(JSON.stringify(val));
    },
    updateQuantum(val) {
      this.updateQuan(val).then(res => {
        if (res) {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.edit.visible = false;
        } else {
          this.$message({
            message: "保存失败",
            type: "warning"
          });
        }
      });
    },
    handleDelete() {
      this.del.visible = true;
    },
    handleFileOut() {},
    handleColumnView() {}
  }
};
</script>