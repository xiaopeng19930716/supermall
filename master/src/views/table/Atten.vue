<template>
  <!-- 部门管理 -->
  <div class="panel">
    <!-- 增加部门弹框 -->
    <AddDialog :dialog="addialog" @onSubmit="addatten"></AddDialog>
    <!-- 编辑部门对话框 -->
    <!-- <EditDialog :dialog="editdialog" :atten="atten" @onSubmit="onSave"></EditDialog> -->
    <!-- 确认删除弹框 -->
    <!-- <DeleteDialog :dialog="deldialog" @onSubmit="deleteattens"></DeleteDialog> -->
    <!-- 按钮组 -->
    <el-row>
      <Buttongroup @handleAdd="handleAdd">
        <template slot="start">
          <el-button type="primary" size="mini" icon="el-icon-delete" @click="handleDeleteattens">删除</el-button>
        </template>
      </Buttongroup>
    </el-row>
    <!-- 表格 -->
    <el-row>
      <Table :header="header" :data="attenData" ref="multipliSelection">
        <template slot="start">
          <el-table-column type="selection" width="35"></el-table-column>
        </template>
        <template slot="end">
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleEdit(scope.index, scope.row)">编辑</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="handleAddQuantum(scope.index, scope.row)"
              >班次详情</el-button>
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
import { AddDialog, EditDialog } from "container/atten/index";
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
        { id: "rankname", label: "班次名称" },
        { id: "rankstart", label: "开始日期", width: "100px" },
        { id: "rankend", label: "结束日期", width: "100px" },
        { id: "cycleunit", label: "周期单位", width: "100px" },
        { id: "deptname", label: "所属部门" }
      ],
      loading: true,
      addialog: {
        title: "新班次",
        visible: true,
        width: "50%"
      },
      editdialog: {
        title: "编辑班次",
        visible: false,
        width: "400px"
      },
      atten: {},
      deldialog: {
        visible: false,
        attenname: [],
        attenid: []
      },
      // 分页器设置
      sizes: [20, 40, 80, 100]
    };
  },
  computed: {
    ...mapState({
      attenData: state => state.atten.attenData,
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
    this.getAllDept();
    this.getAttenData();
  },
  methods: {
    ...mapMutations(["setPageSize", "setCurrent"]),
    ...mapActions([
      "getAttenData",
      "getAllDept",
      "updateAtten",
      "delAtten",
      "insertatten"
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
      this.atten = row;
    },
    onSave(val) {
      this.updateatten(val)
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
      this.deldialog.attenname[0] = row.name;
      this.deldialog.attenid[0] = row.attenid;
    },
    handleDeleteattens() {
      const attens = this.$refs.multipliSelection.$children[0].selection;
      if (attens.length === 0) {
        this.$message({
          message: "未选择任何用户",
          type: "warning"
        });
      } else {
        this.deldialog.visible = true;
        const attenname = [];
        const attenid = [];
        for (const iterator of attens) {
          attenname.push(iterator.name);
          attenid.push(iterator.attenid);
        }
        this.deldialog.attenname = attenname;
        this.deldialog.attenid = attenid;
      }
    },
    deleteattens(val) {
      this.delatten(val)
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
    addatten(val) {
      this.insertatten(val)
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
