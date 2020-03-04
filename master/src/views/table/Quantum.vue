<template>
  <!-- 时间段管理 -->
  <div class="panel">
    <DeleteDialog :dialog="del" @onSubmit="deleteQuantum"></DeleteDialog>
    <AddDialog :dialog="add" :quan="quantum" @onSubmit="insertQuantum"></AddDialog>
    <AddDialog :dialog="edit" :quan="quantum" @onSubmit="updateQuantum"></AddDialog>
    <el-button-group>
      <el-button type="primary" size="mini" @click="handleDelete">删除</el-button>
      <el-button type="primary" size="mini" @click="handleAdd">增加</el-button>
    </el-button-group>
    <MultipleTable :header="header" :data="tableData">
      <template #end>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.row)">时间段详情</el-button>
          </template>
        </el-table-column>
      </template>
    </MultipleTable>
    <Pagination
      :pageSizes="pageSizes"
      @pagesizeChange="pageSizeChange"
      @currentpageChange="currentPageChange"
    ></Pagination>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { Pagination, DeleteDialog, MultipleTable } from "components/index.js";
import { AddDialog } from "container/quantum/index";
export default {
  components: {
    Pagination,
    AddDialog,
    DeleteDialog,
    MultipleTable
  },
  data() {
    return {
      header: [
        { id: "quanid", label: "时间段编号" },
        { id: "quanname", label: "时间段名称", width: "180px" },
        { id: "quanstart", label: "上班时间", width: "100px" },
        { id: "firststart", label: "中途休息开始", width: "100px" },
        { id: "firstend", label: "中途休息结束", width: "100px" },
        { id: "quanend", label: "下班时间", width: "100px" },
        { id: "signin", label: "必须签到" },
        { id: "signoff", label: "必须签退" }
      ],
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
    ...mapActions(["getQuanData", "updateQuan", "insertQuan", "delQuan"]),
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
      const quan = this.$refs.multipliSelection.selection;
      if (quan.length === 0) {
        this.$message({
          message: "未选择任何时间段",
          type: "warning"
        });
      } else {
        this.del.visible = true;
        const username = [];
        const userid = [];
        for (const iterator of quan) {
          username.push(iterator.quanname);
          userid.push(iterator.quanid);
        }
        this.del.username = username;
        this.del.userid = userid;
      }
    },
    deleteQuantum(val) {
      this.delQuan(val).then(res => {
        if (res) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.del.visible = false;
        } else {
          this.$message({
            message: "删除失败",
            type: "warning"
          });
        }
      });
    }
  }
};
</script>