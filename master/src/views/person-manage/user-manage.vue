<template>
  <!-- 部门管理 -->
  <div class="panel">
    <!-- 增加部门弹框 -->
    <UserDialog
      :dialog="addialog"
      @onSubmit="addUserAsync"
    ></UserDialog>
    <!-- 编辑部门对话框 -->
    <UserDialog
      :dialog="editdialog"
      :default="userDefault"
      @onSubmit="updateUserAsync"
    ></UserDialog>
    <!-- 确认删除弹框 -->
    <DeleteDialog
      :dialog="deldialog"
      :row="deleteRow"
      @onSubmit="deleteUsersAsync"
    ></DeleteDialog>
    <!-- 文件导入 -->
    <UploadDialog
      :dialog="fileindialog"
      @checkData="checkUser"
      @onSubmit="fileInUsers"
      ref="uploadUser"
    ></UploadDialog>
    <!-- 面包屑导航 -->
    <!-- 按钮组 -->
    <el-row>
      <Buttongroup
        @handleAdd="handleAddUser"
        @handleFileIn="handleFileInUsers"
        @handleFileOut="fileOutUsers"
      >
        <template slot="start">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-delete"
            @click="handleDeleteUsers"
          >删除</el-button>
        </template>
      </Buttongroup>
      <!-- 顶级部门选择框 -->
      <Inputgroup
        @getByName="getUserByName"
        ref="inputSearch"
      >
        <DeptPicker
          style="float:left"
          @handleSelectChange="getUserByDept"
        ></DeptPicker>
      </Inputgroup>
    </el-row>
    <!-- 表格 -->
    <el-row>
      <Table
        :header="header"
        :data="tableData"
        id="usertable"
        ref="multipliSelection"
      >
        <template slot="start">
          <el-table-column
            type="selection"
            width="35"
          ></el-table-column>
        </template>
        <template slot="end">
          <el-table-column
            fixed="right"
            label="操作"
            width="250"
          >
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="handleEditUser(scope.row)"
              >编辑</el-button>
              <el-popover
                trigger="hover"
                placement="bottom"
              >
                <template slot="reference">
                  <el-button
                    type="primary"
                    size="mini"
                  >详情</el-button>
                </template>
                <p>邮箱:{{scope.row.email}}</p>
                <p>学历:{{scope.row.education}}</p>
                <p>身份证号:{{scope.row.identitycard}}</p>
              </el-popover>

            </template>
          </el-table-column>
        </template>
      </Table>
    </el-row>
    <!-- 分页器 -->
    <Pagination
      :page-sizes="sizes"
      @pagesizeChange="sizeChange"
      @currentpageChange="currentChange"
    >
    </Pagination>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { leadin, leadout } from "assets/js/common/filesaver";
import {
  Pagination,
  Inputgroup,
  Buttongroup,
  UploadDialog,
  Table,
  DeleteDialog
} from "components/index.js";
import UserDialog from "./conpoments/UserDialog";
import DeptPicker from './conpoments/DeptPicker'
export default {
  components: {
    Pagination,
    Inputgroup,
    DeptPicker,
    Buttongroup,
    UploadDialog,
    Table,
    UserDialog,
    DeleteDialog
  },
  data () {
    return {
      header: [
        { id: "userid", label: "人员编号", fixed: true, width: "100" },
        { id: "name", label: "姓名", fixed: true, width: "120" },
        { id: "sex", label: "性别", width: "50" },
        { id: "cardcode", label: "卡号", width: "120" },
        { id: "deptname", label: "部门" },
        { id: "phone", label: "电话号码", width: "150" }
      ],
      addialog: {
        title: "增加人员",
        visible: false
      },
      editdialog: {
        title: "编辑人员",
        visible: false
      },
      userDefault: {},
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
      queryInfo: {
        deptName: "总公司",
        nameOrNo: ""
      },
      // 选择的部门
      deptSelect: "总公司",
      // 分页器设置
      sizes: [20, 50, 100, 200]
    };
  },
  computed: {
    ...mapState({
      tableData: state => state.user.data,
      isLoading:state=>state.user.isLoading
    })
  },
  created () {
    this.getAllDept();
    this.setPageSize(20);
    this.getUserDataByDept(this.queryInfo);
  },
  methods: {
    ...mapMutations(["setPageSize", "setCurrent"]),
    ...mapActions([
      "getUserDataByDept",
      "getAllDept",
      "updateUserData",
      "insertUserData",
      "fileInUserData",
      "delUserData"
    ]),
    // 点击搜索时
    getUserByName (val) {
      this.queryInfo.nameOrNo = val;
      this.setCurrent(1);
      this.getUserDataByDept(this.queryInfo);
    },
    // 部门改变时
    getUserByDept (val) {
      this.queryInfo.deptName = val;
      // 页数重置
      this.setCurrent(1);
      // 输入框清空
      this.queryInfo.nameOrNo = "";
      this.$refs["inputSearch"].input = "";
      // 查询
      this.getUserDataByDept(this.queryInfo);
    },
    //  每页大小改变
    sizeChange (val) {
      this.setPageSize(val);
      this.setCurrent(1);
      this.getUserDataByDept(this.queryInfo);
    },
    // 当前页改变
    currentChange (val) {
      this.setCurrent(val);
      this.getUserDataByDept(this.queryInfo);
    },
    // 编辑
    handleEditUser (row) {
      this.editdialog.visible = true;
      this.userDefault = { ...row };
    },
    updateUserAsync (val) {
      this.updateUserData(val)
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
    handleAddUser () {
      this.userDefault = {
        name: "",
        cardcode: "",
        sex: "男",
        deptname: "总公司",
        email: "",
        phone: "",
        identitycard: "",
        rankname: "默认班次"
      };
      this.addialog.visible = true;
    },
    addUserAsync (val) {
      this.insertUserData(val)
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
              type: "error"
            });
          }
        })
        .catch(err => console.log(err));
    },
    handleDeleteUsers () {
      const users = this.$refs.multipliSelection.$children[0].selection;
      if (users.length === 0) {
        this.$message({
          message: "未选择任何用户",
          type: "error"
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
    deleteUsersAsync () {
      const userId = this.deleteRow.id;
      this.delUserData(userId)
        .then(res => {
          const input = this.input || 0;
          if (res) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.deldialog.visible = false;
            // 重新获取新的用户
            this.getUserDataByDept(this.queryInfo);
          } else {
            this.$message({
              message: "删除失败",
              type: "error"
            });
          }
        })
        .catch(err => err);
    },
    handleFileInUsers () {
      this.fileindialog.visible = true;
    },
    checkUser (table) {
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
    fileInUsers (val) {
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
    fileOutUsers () {
      leadout("usertable", "用户信息");
    }
  }
};
</script>
<style lang="stylus" scoped>
.css {
  display: flex;
  justify-content: space-around;
}
</style>