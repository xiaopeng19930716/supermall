<template>
  <!-- 部门管理 -->
  <div class="panel">
    <!-- 增加部门弹框 -->
    <AddDialog :dialog="addialog" :dialogform="addform"></AddDialog>
    <!-- 编辑部门对话框 -->
    <EditDialog :dialog="editdialog" :items="editform.items" @onSubmit="onSave"></EditDialog>
    <!-- 确认删除弹框 -->
    <DeleteDialog :dialog="deldialog" @onSubmit="confirmDel"></DeleteDialog>
    <!-- 文件导入 -->
    <!-- <el-dialog :visible.sync="dialog.fileinvisible">
      <Upload></Upload>
    </el-dialog>-->
    <!-- 面包屑导航 -->
    <!-- <Breadcrumb></Breadcrumb> -->
    <!-- 按钮组 -->
    <el-row>
      <Buttongroup>
        <el-button type="primary" size="mini" icon="el-icon-document" @click="filein">导入</el-button>
        <el-button type="primary" size="mini" icon="el-icon-document" @click="fileout">导出</el-button>
        <el-button type="primary" size="mini" icon="el-icon-plus" @click="add">新增</el-button>
      </Buttongroup>
      <!-- 顶级部门选择框 -->
      <Inputgroup></Inputgroup>
    </el-row>
    <!-- 表格 -->
    <el-row>
      <Table :header="header" :data="getTableView">
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="warning" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </Table>
    </el-row>
    <!-- 分页器 -->
    <Pagination
      :current-page="current"
      :page-sizes="sizes"
      :page-size="size"
      :total="getTotal"
      @pagesizeChange="sizeChange"
      @currentpageChange="currentChange"
    ></Pagination>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { leadin, leadout } from "assets/js/common/filesaver";
import {
  Breadcrumb,
  Pagination,
  Inputgroup,
  Buttongroup,
  Upload,
  Table,
  DeleteDialog
} from "components/index.js";
import { AddDialog, EditDialog } from "../../container/dept/index";
export default {
  components: {
    Breadcrumb,
    Pagination,
    Inputgroup,
    Buttongroup,
    Upload,
    Table,
    AddDialog,
    EditDialog,
    DeleteDialog
  },
  data() {
    return {
      header: [
        { id: "deptno", label: "部门编号" },
        { id: "deptname", label: "部门名称", width: "250" },
        { id: "pid", label: "上级部门" },
        { id: "deptow", label: "部门负责人" },
        { id: "deptphone", label: "部门电话" }
      ],
      addialog: {
        title: "增加部门",
        visible: false
      },
      addform: {
        items: [
          { value: "", label: "部门名称" },
          { value: "", label: "上级部门" },
          { value: "", label: "负责人" },
          { value: "", label: "电话" }
        ]
      },
      editdialog: {
        title: "编辑部门",
        visible: false
      },
      editform: {
        items: [
          { id: "deptno", value: "", label: "部门编号", disable: true },
          { id: "deptname", value: "", label: "部门名称", maxlength: 20 },
          { id: "pid", value: "", label: "上级部门", disable: true },
          { id: "deptow", value: "", label: "负责人", maxlength: 20 },
          { id: "deptphone", value: "", label: "电话", maxlength: 20 }
        ]
      },
      deldialog: {
        visible: false,
        msg: "",
        data: {}
      },
      //输入搜索
      input: "",
      table: {
        index: 0
      },
      // 分页器设置
      sizes: [20, 40, 60, 80]
    };
  },
  computed: {
    ...mapState({
      data: state => state.dept.data,
      current: state => state.dept.current,
      size: state => state.dept.size
    }),
    ...mapGetters(["getTotal", "getTableView"])
  },
  created() {
    this.getAllDept();
  },
  methods: {
    ...mapActions(["getAllDept"]),
    //  每页大小改变
    sizeChange(val) {
      this.$store.dispatch("sizeChange", val);
    },
    // 当前页改变
    currentChange(val) {
      this.$store.dispatch("currentChange", val);
    },
    // 编辑
    handleEdit(index, row) {
      this.editdialog.visible = true;
      const value = Object.values(row);
      const key = Object.keys(row);
      for (let index = 0; index < value.length - 1; index++) {
        this.editform.items[index].value = value[index];
      }
    },
    onSave(val) {
      this.$store
        .dispatch("updateDept", val)
        .then(res => {
          this.$message({
            message: "数据保存成功",
            type: "success"
          });
          this.editdialog.visible = false;
        })
        .catch(err => {
          this.$message({
            message: "数据库连接错误",
            type: "warning"
          });
        });
    },
    // 删除
    handleDelete(index, row) {
      this.deldialog.visible = true;
      this.deldialog.msg = row.deptname;
      this.deldialog.data = row;
    },
    confirmDel() {
      const pramas = this.deldialog.data;
      // 判断部门下是否存在人员存在人员需要先删除人员
      // console.log(pramas);
      //判断是否是顶级部门 顶级部门不允许删除
      // 判断是否存在子部门提示会删除子部门
    },
    add() {
      this.addialog.visible = true;
    },
    filein() {
      this.dialog.fileinvisible = true;
      leadin("deptable");
    },
    fileout() {
      leadout("deptable", "部门表");
    }
  }
};
</script>
