<template>
  <!-- 部门管理 -->
  <div class="panel">
    <!-- 增加部门弹框 -->
    <DeptDialog :dialog="addialog" @onSubmit="addDept"></DeptDialog>
    <!-- 编辑部门对话框 -->
    <DeptDialog :dialog="editdialog" :form="editForm" :isDisabled="true" @onSubmit="updateDept"></DeptDialog>
    <!-- 确认删除弹框 -->
    <DeleteDialog :dialog="deldialog" :row="deleteRow" @onSubmit="deleteDept"></DeleteDialog>
    <!-- 文件导入 -->
    <UploadDialog :dialog="fileindialog" @onSubmit="fileIn" @checkData="checkDept"></UploadDialog>
    <!-- 按钮组 -->
    <el-row>
      <Buttongroup @handleAdd="handleAddDept" @handleFileIn="handleFileIn" @handleFileOut="fileout"></Buttongroup>
      <!-- 顶级部门选择框 -->
      <Inputgroup @search="search"></Inputgroup>
    </el-row>
    <!-- 表格 -->
    <el-row>
      <Table :header="header" :data="tableData" id="deptable">
        <template slot="end">
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleEditDept(scope.row)">编辑</el-button>
              <el-button size="mini" type="primary" @click="handleDeleteDept(scope.row)">删除</el-button>
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
import { leadout } from "assets/js/common/filesaver";
import http from "network/localaxios";
import {
  Breadcrumb,
  Pagination,
  Inputgroup,
  Buttongroup,
  UploadDialog,
  Table,
  DeleteDialog
} from "components/index.js";
import { DeptDialog } from "container/dept/index";
export default {
  components: {
    Breadcrumb,
    Pagination,
    Inputgroup,
    Buttongroup,
    UploadDialog,
    Table,
    DeptDialog,
    DeleteDialog
  },
  data() {
    return {
      header: [
        { id: "deptno", label: "部门编号" },
        { id: "deptname", label: "部门名称", width: "250" },
        { id: "pidname", label: "上级部门" },
        { id: "deptow", label: "部门负责人" },
        { id: "deptphone", label: "部门电话" }
      ],
      addialog: {
        title: "增加部门",
        visible: false
      },
      editdialog: {
        title: "编辑部门",
        visible: false
      },
      editForm: {},
      deldialog: {
        visible: false
      },
      deleteRow: { id: [], name: [] },
      fileindialog: {
        visible: false,
        direction: "rtl",
        width: "35%",
        header: [
          { id: "deptname", label: "*部门名称*" },
          { id: "pidname", label: "*上级部门*" },
          { id: "deptow", label: "部门负责人" },
          { id: "deptphone", label: "部门电话" }
        ],
        format: "deptname  pidname  deptow  deptphone;",
        error: "",
        checked: true
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
      tableData: state => {
        const current = state.pagi.current;
        const pageSize = state.pagi.pageSize;
        let array = state.dept.data;
        if (array.length) {
          array = array.slice((current - 1) * pageSize, current * pageSize);
          return array;
        }
      }
    })
  },
  created() {
    this.setPageSize(20);
    this.getAllDept().then(total => {
      this.setTotal(total);
    });
  },
  methods: {
    ...mapMutations(["setCurrent", "setPageSize", "setTotal"]),
    ...mapActions([
      "getAllDept",
      "updateDeptData",
      "insertDeptData",
      "deleteDeptData"
    ]),
    //  每页大小改变
    sizeChange(val) {
      this.setCurrent(1);
      this.setPageSize(val);
    },
    // 当前页改变
    currentChange(val) {
      this.setCurrent(val);
    },
    // 编辑
    handleEditDept(row) {
      this.editForm = { ...row };
      if (this.editForm.deptno === 0) {
        this.$message({
          message: "顶级部门无法更改",
          type: "info"
        });
      } else {
        this.editdialog.visible = true;
      }
    },
    updateDept(val) {
      this.updateDeptData(val)
        .then(res => {
          if (res) {
            this.$message({
              message: "数据保存成功",
              type: "success"
            });
            this.editdialog.visible = false;
          } else {
            this.$message({
              message: "数据库连接错误",
              type: "warning"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 删除
    handleDeleteDept(row) {
      this.deleteRow.name[0] = row.deptname;
      this.deleteRow.id[0] = row.deptno;
      //判断是否是顶级部门 顶级部门不允许删除
      if (this.deleteRow.id[0] === 0) {
        this.$message({
          message: "顶级部门不允许删除",
          type: "info"
        });
      } else {
        this.deldialog.visible = true;
      }
    },
    deleteDept() {
      const deptname = this.deleteRow.name[0];
      // 查询部门下是否存在人员先确认删除人员
      this.deleteDeptData({ deptname })
        .then(res => {
          if (res) {
            res == 1
              ? this.$message({
                  message: "部门下存在子部门不允许删除",
                  type: "warning"
                })
              : this.$message({
                  message: "部门下存在人员不允许删除",
                  type: "warning"
                });
          } else {
            // 删除部门成功
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.deldialog.visible = false;
          }
        })
        .catch(err => console.log(err));
    },
    handleAddDept() {
      this.addialog.visible = true;
    },
    addDept(val) {
      this.insertDeptData(val)
        .then(res => {
          if (res) {
            this.$message({
              message: "增加部门成功",
              type: "success"
            });
            this.addialog.visible = false;
          } else {
            this.$message({
              message: "增加部门失败",
              type: "warning"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleFileIn() {
      this.fileindialog.visible = true;
    },
    checkDept(table) {
      const array = this.alldept.concat(table);
      const reg = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g;
      const deptname = [];
      const pidname = [];
      var check = true;
      for (const iterator of this.alldept) {
        pidname.push(iterator.pidname);
      }
      // 检查所有字符
      for (const value of table) {
        for (const key in value) {
          if (value.hasOwnProperty(key)) {
            const element = value[key];
            if (reg.test(element)) {
              this.fileindialog.error = "错误提示：";
              this.fileindialog.error += element + "包含特殊字符";
              check = false;
            }
            //检查父部门是否存在
          }
        }
      }
      // 检查名称和上级部门
      for (const iterator of array) {
        deptname.push(iterator.deptname);
      }
      const length = deptname.length;
      const name = Array.from(new Set(deptname));
      const leng = name.length;
      if (length > leng) {
        console.log("有重复的部门名称");
        this.fileindialog.error += "有重复的部门名称";
        check = false;
      }
      this.fileindialog.checked = check;
    },
    fileIn(val) {
      if (this.fileindialog.checked) {
        this.$store.dispatch("fileInDept", val).then(res => {
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
      leadout("deptable", "部门表");
    }
  }
};
</script>
