<template>
  <!-- 部门管理 -->
  <div class="panel">
    <!-- 增加部门弹框 -->
    <FormDialog :dialog="addialog" :dialogform="addform"></FormDialog>
    <!-- 编辑部门对话框 -->
    <FormDialog :dialog="editdialog" :dialogform="editform" :onSubmit="onSubmit"></FormDialog>
    <!-- 确认删除弹框 -->
    <!-- <el-dialog :visible.sync="dialog.delvisible">
      <span>
        确定删除
        <strong>{{dialog.alertMsg}}</strong>吗
      </span>
      <span slot="footer">
        <el-button type="primary" size="small" @click="cancel">取 消</el-button>
        <el-button type="danger" size="small" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>-->
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
      <Table :header="header" :data="show">
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
      :total="total"
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
  Editdialog,
  Upload,
  Table,
  FormDialog
} from "components/index.js";

export default {
  components: {
    Breadcrumb,
    Pagination,
    Inputgroup,
    Buttongroup,
    Editdialog,
    Upload,
    Table,
    FormDialog
  },
  data() {
    return {
      header: [
        { id: "id", label: "部门编号" },
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
        rows: [
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
        rows: [
          { value: "", label: "部门编号", disable: true },
          { value: "", label: "部门名称" },
          { value: "", label: "上级部门" },
          { value: "", label: "负责人" },
          { value: "", label: "电话" }
        ]
      },
      //输入搜索
      input: "",
      table: {
        index: 0
      },
      // 分页器设置
      sizes: [10, 20, 80, 100]
    };
  },
  computed: {
    ...mapState({
      data: state => state.dept.data,
      current: state => state.dept.current,
      size: state => state.dept.size
    }),
    ...mapGetters(["total", "show"])
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
      // const arr = Array.from(row)
      const arr = Object.values(row);
      for (var i = 0; i < arr.length; i++) {
        this.editform.rows[i].value = arr[i];
      }
    },
    onSubmit(val) {
      console.log(val);
    }
    // 删除
    // handleDelete(index, row) {
    //   console.log(index, row);
    //   this.table.index = index;
    //   this.dialog.delvisible = true;
    //   this.dialog.alertMsg = row.deptname;
    // },
    // cancel() {
    //   this.dialog.editvisible = false;
    //   this.dialog.delvisible = false;
    //   this.dialog.visible = false;
    // },
    // confirm() {
    //   // 本地删除
    //   delete this.table.tableData[this.table.index];
    //   this.$message("删除成功");
    //   this.dialog.delvisible = false;
    // },
    // // 每页大小改变
    // add() {
    //   this.addialog.visible = true;
    // },
    // filein() {
    //   this.dialog.fileinvisible = true;
    //   leadin("deptable");
    // },
    // fileout() {
    //   leadout("deptable", "部门表");
    // }
  }
};
</script>
