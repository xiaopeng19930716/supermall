<template>
  <!-- 部门管理 -->
  <div class="panel">
    <!-- 增加部门弹框 -->
    <AddDialog :dialog="addialog" @onSubmit="addUser"></AddDialog>
    <!-- 编辑部门对话框 -->
    <EditDialog :dialog="editdialog" :user="user" @onSubmit="onSave"></EditDialog>
    <!-- 确认删除弹框 -->
    <DeleteDialog :dialog="deldialog" :row="deleteRow" @onSubmit="deleteUsers"></DeleteDialog>
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
      <Inputgroup @getByName="getUserByName">
        <DeptPicker style="float:left" @getByDept="getUserByDept"></DeptPicker>
      </Inputgroup>
    </el-row>
    <!-- 表格 -->
    <el-row>
      <Table :header="header" :data="userData" id="usertable" ref="multipliSelection">
        <template slot="start">
          <el-table-column type="selection" width="35"></el-table-column>
        </template>
        <template slot="end">
          <el-table-column fixed="right" label="操作" width="160">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleEdit(scope.index, scope.row)">编辑</el-button>
              <el-popover trigger="hover" placement="bottom">
                <p>邮箱:{{scope.row.email}}</p>
                <p>学历:{{scope.row.education}}</p>
                <p>身份证号:{{scope.row.identitycard}}</p>
                <div slot="reference" style="float:right">
                  <el-button type="primary" size="mini">详细信息</el-button>
                </div>
              </el-popover>
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
import { DeptPicker } from "container/dept/index";
export default {
  components: {
    Pagination,
    Inputgroup,
    DeptPicker,
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
        { id: "name", label: "姓名", fixed: true, width: "120" },
        { id: "sex", label: "性别", width: "45" },
        { id: "cardcode", label: "卡号", width: "120" },
        { id: "deptname", label: "部门" },
        { id: "phone", label: "电话号码", width: "150" }
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
      deleteRow: {
        id: [],
        name: []
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
      input: null,
      // 选择的部门
      deptSelect: "总公司",
      // 分页器设置
      sizes: [20, 50, 100, 200]
    };
  },
  computed: {
    ...mapState({
      userData: state => state.user.userData,
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
    this.setPageSize(20);
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
        this.deleteRow.name = username;
        this.deleteRow.id = userid;
      }
    },
    deleteUsers() {
      const val = this.deleteRow.id;
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
    getUserByDept(val) {
      this.deptSelect = val;
      // 页数重置
      this.setCurrent(1);
      // 输入框清空
      const input = 0;
      // 查询
      this.querryByDept({ deptName: this.deptSelect, nameOrNo: input });
    },
    getUserByName(val) {
      this.input = val;
      this.setCurrent(1);
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
