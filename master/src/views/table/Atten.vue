<template>
  <!-- 部门管理 -->
  <div class="panel">
    <!-- 增加部门弹框 -->
    <AddDialog :dialog="addialog" @onSubmit="addUser"></AddDialog>
    <!-- 编辑部门对话框 -->
    <EditDialog :dialog="editdialog" :user="user" @onSubmit="onSave"></EditDialog>
    <!-- 确认删除弹框 -->
    <DeleteDialog :dialog="deldialog" @onSubmit="deleteUsers"></DeleteDialog>
    <!-- 面包屑导航 -->
    <!-- 按钮组 -->
    <el-row>
      <Buttongroup @handleAdd="handleAdd">
        <template slot="start">
          <el-button type="primary" size="mini" icon="el-icon-delete" @click="handleDeleteUsers">删除</el-button>
        </template>
      </Buttongroup>
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
              <el-button
                type="primary"
                size="mini"
                @click="handleAddQuantum(scope.index, scope.row)"
              >添加时段</el-button>
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
import {
  Pagination,
  Buttongroup,
  UploadDialog,
  Table,
  DeleteDialog
} from "components/index.js";
import { AddDialog, EditDialog } from "container/user/index";
export default {
  components: {
    Pagination,
    Buttongroup,
    Table,
    AddDialog,
    EditDialog,
    DeleteDialog
  },
  data() {
    return {
      header: [
        { id: "rankname", label: "班次名称", fixed: true, width: "100" },
        { id: "rankstart", label: "开始日期", fixed: true },
        { id: "rankend", label: "结束日期" },
        { id: "rankcycle", label: "周期数" },
        { id: "cycleunit", label: "周期单位" },
        { id: "deptname", label: "所属部门", width: "200" }
      ],
      loading: true,
      addialog: {
        title: "新班次",
        visible: false
      },
      editdialog: {
        title: "编辑班次",
        visible: false
      },
      user: {},
      deldialog: {
        visible: false,
        username: [],
        userid: []
      },
      // 分页器设置
      sizes: [20, 40, 80, 100]
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
    this.setPageSize(20);
  },
  methods: {
    ...mapMutations(["setPageSize", "setCurrent"]),
    ...mapActions([
      "getUserData",
      "querryByDept",
      "getAllDept",
      "updateUser",
      "delUser",
      "insertUser"
    ]),
    //  每页大小改变
    sizeChange(val) {
      this.setPageSize(val);
    },
    // 当前页改变
    currentChange(val) {
      this.setCurrent(val);
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
    handleAddQuantum(index, row) {
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
    }
  }
};
</script>
