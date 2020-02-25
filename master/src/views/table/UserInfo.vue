<template>
  <!-- 部门管理 -->
  <div class="panel">
    <!-- 增加部门弹框 -->
    <AddDialog :dialog="addialog" @onSubmit="addUser"></AddDialog>
    <!-- 编辑部门对话框 -->
    <EditDialog :dialog="editdialog" :user="user" @onSubmit="onSave"></EditDialog>
    <!-- 确认删除弹框 -->
    <DeleteDialog :dialog="deldialog" @onSubmit="deleteUsers"></DeleteDialog>
    <!-- 文件导入 -->
    <UploadDialog :dialog="fileindialog" @onSubmit="fileIn" @checkData="checkUser" ref="uploadUser"></UploadDialog>
    <!-- 面包屑导航 -->
    <!-- 按钮组 -->
    <el-row>
      <Buttongroup @handleAdd="handleAdd" @handleFileIn="handleFileIn" @handleFileOut="fileout">
        <template slot="start">
          <el-button type="primary" size="mini" icon="el-icon-delete" @click="handleDeleteUsers">删除</el-button>
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
      <Table :header="header" :data="userData" id="usertable" ref="multipliSelection">
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
    <Pagination :page-sizes="sizes" @pagesizeChange="sizeChange" @currentpageChange="currentChange"></Pagination>
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
        username: [],
        userid: []
      },
      fileindialog: {
        visible: false,
        direction: "rtl",
        width: "40%",
        header: [
          { id: "name", label: "*姓名*", fixed: true },
          { id: "deptname", label: "*部门*", width: "200" },
          { id: "sex", label: "性别" },
          { id: "cardcode", label: "卡号" },
          { id: "phone", label: "电话号码", width: "120" },
          { id: "email", label: "邮箱", width: "150" },
          { id: "identitycard", label: "身份证号", width: "200" }
        ],
        format:
          "name  userid  sex  cardcode deptname phone email identitycard;",
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
      sizes: [50, 100, 200, 400]
    };
  },
  computed: {
    ...mapState({
      userData: state => state.user.userData,
      deptInfo: state => state.dept.alldept,
      deptName: state => {
        const deptname = [];
        state.dept.alldept.forEach(element => {
          deptname.push(element.deptname);
        });
        return deptname;
      }
    })
  },
  created() {
    this.setPageSize(100);
    this.getUserData();
  },
  mounted() {
    this.getAllDept();
  },
  methods: {
    ...mapMutations(["setPageSize", "setCurrent"]),
    ...mapActions([
      "getUserData",
      "querryByDept",
      "getAllDept",
      "updateUser",
      "delUser",
      "insertUser",
      "fileInUser"
    ]),
    //  每页大小改变
    sizeChange(val) {
      this.setPageSize(val);
      const input = this.input || 0;
      this.querryByDept({ deptName: this.deptSelect, nameOrNo: input });
    },
    // 当前页改变
    currentChange(val) {
      this.setCurrent(val);
      const input = this.input || 0;
      this.querryByDept({ deptName: this.deptSelect, nameOrNo: input });
    },
    // 编辑
    handleEdit(index, row) {
      this.editdialog.visible = true;
      this.user = row;
    },
    onSave(val) {
      this.updateUser(val)
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
      this.deldialog.username[0] = row.name;
      this.deldialog.userid[0] = row.userid;
    },
    handleDeleteUsers() {
      const users = this.$refs.multipliSelection.$children[0].selection;
      if (users.length === 0) {
        this.$message({
          message: "未选择任何用户",
          type: "warning"
        });
      } else {
        this.deldialog.visible = true;
        const username = [];
        const userid = [];
        for (const iterator of users) {
          username.push(iterator.name);
          userid.push(iterator.userid);
        }
        this.deldialog.username = username;
        this.deldialog.userid = userid;
      }
    },
    deleteUsers(val) {
      this.delUser(val)
        .then(res => {
          const input = this.input || 0;
          if (res) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.deldialog.visible = false;
            // 重新获取新的用户
            this.querryByDept({ deptName: this.deptSelect, nameOrNo: input });
          } else {
            this.$message({
              message: "删除失败",
              type: "warning"
            });
          }
        })
        .catch(err => err);
    },
    handleAdd() {
      this.addialog.visible = true;
    },
    addUser(val) {
      this.insertUser(val)
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
    checkUser(table) {
      this.fileindialog.checked = true;
      const reg = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g;
      table.forEach(element => {
        // 姓名是否为空
        if (!element.name || !element.deptname) {
          this.fileindialog.error = "错误提示：";
          this.fileindialog.error += "姓名或者部门不能为空  ";
          this.fileindialog.checked = false;
        } else if (this.deptName.indexOf(element.deptname) === -1) {
          this.fileindialog.error += "部门不存在  ";
          this.fileindialog.checked = false;
        }
        for (const key in element) {
          if (element.hasOwnProperty(key)) {
            const elem = element[key];
            if (reg.test(elem)) {
              this.fileindialog.error += "字段含有特殊字符  ";
              this.fileindialog.checked = false;
            }
          }
        }
      });
    },
    fileIn(val) {
      if (this.fileindialog.checked) {
        this.fileInUser(val).then(res => {
          if (res) {
            this.$notify({
              title: "导入成功",
              message: "已保存记录",
              type: "success"
            });
            // 导入成功后重置
            this.$refs.uploadUser.resetTable();
          } else {
            this.$notify.error({
              title: "导入失败",
              message: "请检查内容是否超过了20个字符"
            });
          }
        });
      } else {
        this.$notify({
          title: "警告",
          message: "信息未通过检测",
          type: "warning"
        });
      }
    },
    fileout() {
      leadout("usertable", "用户信息");
    }
  }
};
</script>
