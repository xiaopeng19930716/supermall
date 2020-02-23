<template>
  <!-- 部门管理 -->
  <div class="panel">
    <!-- 增加部门弹框 -->
    <AddDialog :dialog="addialog" @onSubmit="addUser"></AddDialog>
    <!-- 编辑部门对话框 -->
    <EditDialog :dialog="editdialog" :user="user" @onSubmit="onSave"></EditDialog>
    <!-- 确认删除弹框 -->
    <DeleteDialog :dialog="deldialog" @onSubmit="confirmDel"></DeleteDialog>
    <!-- 文件导入 -->
    <UploadDialog :dialog="fileindialog" @onSubmit="fileIn" @checkData="checkUser"></UploadDialog>
    <!-- 面包屑导航 -->
    <!-- 按钮组 -->
    <el-row>
      <Buttongroup @handleAdd="handleAdd" @handleFileIn="handleFileIn" @handleFileOut="fileout">
        <template slot="start">
          <el-button type="primary" size="mini" icon="el-icon-delete" @click="handleDelete">删除</el-button>
        </template>
      </Buttongroup>
      <!-- 顶级部门选择框 -->
      <Inputgroup @search="searchUser">
        <el-select v-model="deptSelect" placeholder="请选择部门" size="mini" filterable>
          <el-option
            v-for="item in deptInfo"
            :key="item.deptno"
            :label="item.label"
            :value="item.deptname"
          ></el-option>
        </el-select>
      </Inputgroup>
    </el-row>
    <!-- 表格 -->
    <el-row>
      <Table :header="header" :data="userData" id="usertable">
        <template slot="start">
          <el-table-column type="selection" width="35"></el-table-column>
        </template>
        <template slot="end">
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleEdit(scope.index, scope.row)">编辑</el-button>
              <el-button type="primary" size="mini" @click="handleDelete(scope.index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </template>
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
  UploadDialog,
  Table,
  DeleteDialog
} from "components/index.js";
import { AddDialog, EditDialog } from "container/user/index";
export default {
  components: {
    Breadcrumb,
    Pagination,
    Inputgroup,
    Buttongroup,
    UploadDialog,
    Table,
    AddDialog,
    EditDialog,
    DeleteDialog
  },
  data() {
    return {
      header: [
        { id: "userid", label: "人员编号", fixed: true, width: "100" },
        { id: "name", label: "姓名", fixed: true },
        { id: "sex", label: "性别", width: "48" },
        { id: "cardcode", label: "卡号" },
        { id: "deptname", label: "部门", width: "200" },
        { id: "phone", label: "电话号码", width: "120" },
        { id: "email", label: "邮箱", width: "150" },
        { id: "identitycard", label: "身份证号" }
      ],
      loading: true,
      addialog: {
        title: "增加人员",
        visible: false
      },
      editdialog: {
        title: "编辑人员",
        visible: false
      },
      user: {},
      deldialog: {
        visible: false,
        msg: "",
        data: {}
      },
      fileindialog: {
        visible: false,
        direction: "rtl",
        width: "40%",
        header: [
          { id: "name", label: "*姓名*" },
          { id: "userno", label: "*部门*" },
          { id: "sex", label: "性别" },
          { id: "cardcode", label: "卡号" },
          { id: "deptname", label: "部门", width: "200" },
          { id: "phone", label: "电话号码", width: "120" },
          { id: "email", label: "邮箱", width: "150" },
          { id: "identitycard", label: "身份证号" }
        ],
        format: "name  userno  sex  cardcode;",
        error: "",
        checked: true
      },
      //输入搜索
      input: "",
      // 选择的部门
      deptSelect: "总公司",
      table: {
        index: 0
      },
      // 分页器设置
      sizes: [100, 200, 300, 400]
    };
  },
  computed: {
    ...mapState({
      userData: state => state.user.userData,
      current: state => state.user.userCurrent,
      size: state => state.user.userPageSize,
      total: state => state.user.userCount,
      deptInfo: state => state.dept.alldept
    })
  },
  created() {
    this.getAllDept();
    this.getUserData();
  },
  methods: {
    ...mapActions(["getUserData", "querryByDept", "getAllDept"]),
    //  每页大小改变
    sizeChange(val) {
      this.$store.dispatch("sizeChange", val);
      const input = this.input || 0;
      this.querryByDept({ deptName: this.deptSelect, nameOrNo: input });
    },
    // 当前页改变
    currentChange(val) {
      this.$store.dispatch("currentChange", val);
      const input = this.input || 0;
      this.querryByDept({ deptName: this.deptSelect, nameOrNo: input });
    },
    // 编辑
    handleEdit(index, row) {
      this.editdialog.visible = true;
      this.user = row;
    },
    onSave(val) {
      this.$store
        .dispatch("updateUser", val)
        .then(res => {
          if (res) {
            this.$message({
              message: "数据保存成功",
              type: "success"
            });
            this.editdialog.visible = false;
          } else {
            this.$message({
              message: "数据保存失败",
              type: "warning"
            });
          }
        })
        .catch(err => console.log(err));
    },
    // 删除
    handleDelete(index, row) {
      this.deldialog.visible = true;
      this.deldialog.msg = row.username;
      this.deldialog.data = row;
    },
    confirmDel() {},
    handleAdd() {
      this.addialog.visible = true;
    },
    addUser(val) {
      this.$store
        .dispatch("addUser", val)
        .then(res => {
          if (res) {
            this.$message({
              message: "用户保存成功",
              type: "success"
            });
            this.addialog.visible = false;
          } else {
            this.$message({
              message: "用户保存失败",
              type: "warning"
            });
          }
        })
        .catch(err => console.log(err));
    },
    searchUser(val) {
      this.input = val;
      const input = this.input || 0;
      this.querryByDept({ deptName: this.deptSelect, nameOrNo: input });
    },
    handleFileIn() {
      this.fileindialog.visible = true;
    },
    checkuser(table) {},
    fileIn(val) {
      if (this.fileindialog.checked) {
        this.$store.dispatch("fileInuser", val).then(res => {
          if (res) {
            this.$notify({
              title: "导入成功",
              message: "已保存记录到数据库",
              type: "success"
            });
          } else {
            this.$notify.error({
              title: "导入失败",
              message: "请检查内容是否超过了20个字符"
            });
          }
        });
      }
    },
    fileout() {
      leadout("usertable", "用户信息");
    }
  }
};
</script>
