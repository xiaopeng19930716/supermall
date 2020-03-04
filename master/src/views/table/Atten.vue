<template>
  <!-- 班次管理 -->
  <div class="panel">
    <!-- 添加基本配置弹框 -->
    <AddDialog :dialog="addDialog" :form="selectRow" @onSubmit="addBaseConfig"></AddDialog>
    <!-- 编辑基本配置对话框 -->
    <AddDialog :dialog="editDialog" :form="selectRow" @onSubmit="editBaseConfig"></AddDialog>
    <!-- 班次详情 -->
    <EditDialog :dialog="quanDialog" :form="quanInfo" @onSubmit="editQuantum"></EditDialog>
    <!-- 确认删除弹框 -->
    <DeleteDialog :dialog="delDialog" :row="deleteRow" @onSubmit="deleteAllInfo"></DeleteDialog>
    <!-- 按钮组 -->
    <el-row>
      <Buttongroup @handleAdd="handleAddBaseConfig" :isFileIn="false">
        <template #start>
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-delete"
            @click="handleDeleteAllInfo"
          >删除</el-button>
        </template>
      </Buttongroup>
    </el-row>
    <!-- 表格 -->
    <el-row>
      <Table :header="header" :data="tableData" ref="multipliSelection">
        <template #start>
          <el-table-column type="selection" width="35"></el-table-column>
        </template>
        <template #end>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="handleEditBaseConfig(scope.index, scope.row)"
              >编辑</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="handleEditQuantum(scope.index, scope.row)"
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
        { id: "cycle", label: "周期数", width: "80px" },
        { id: "deptname", label: "所属部门" }
      ],
      selectRow: {},
      addDialog: {
        title: "基本配置",
        visible: false,
        width: "500px"
      },
      editDialog: {
        title: "编辑配置",
        visible: false,
        width: "500px"
      },
      quanDialog: {
        title: "班次详情",
        visible: false,
        width: "35%"
      },
      delDialog: {
        visible: false
      },
      quanInfo: {
        quantum: "",
        days: "",
        items: ""
      },
      deleteRow: {
        id: [],
        name: []
      },
      // 分页器设置
      sizes: [20, 40, 80, 100]
    };
  },
  computed: {
    ...mapState({
      tableData: state => state.atten.attenData
    })
  },
  created() {
    this.setPageSize(20);
    this.getAttenData();
  },
  methods: {
    ...mapMutations(["setPageSize", "setCurrent"]),
    ...mapActions(["getAttenData", "updateAtten", "delAtten", "insertAtten"]),
    //  每页大小改变
    sizeChange(val) {
      this.setPageSize(val);
    },
    // 当前页改变
    currentChange(val) {
      this.setCurrent(val);
    },
    // 增加基本配置
    handleAddBaseConfig() {
      this.addDialog.visible = true;
      this.selectRow = {
        rankname: "",
        rank: [],
        rankstart: "",
        rankend: "",
        cycleunit: "周",
        deptname: "总公司",
        cycle: 0
      };
    },
    // 编辑基本配置
    handleEditBaseConfig(index, row) {
      this.editDialog.visible = true;
      this.selectRow = { ...row };
      this.selectRow.rank = [row.rankstart, row.rankend];
    },
    // 编辑班次详情
    handleEditQuantum(index, row) {
      this.quanDialog.visible = true;
      this.quanDialog.title = row.rankname;
      this.quanInfo = {
        rankid: row.rankid,
        quantum: row.rankquantum,
        days: row.rankdays,
        cycleunit: row.cycleunit
      };
    },
    // 删除班次信息
    handleDeleteAllInfo() {
      const selectItem = this.$refs.multipliSelection.$children[0].selection;
      if (selectItem.length === 0) {
        this.$message({
          message: "未选择任何班次",
          type: "warning"
        });
      } else {
        this.delDialog.visible = true;
        const name = [];
        const id = [];
        for (const iterator of selectItem) {
          name.push(iterator.rankname);
          id.push(iterator.rankid);
        }
        this.deleteRow.name = name;
        this.deleteRow.id = id;
      }
    },
    addBaseConfig(val) {
      this.insertAtten(val)
        .then(res => {
          if (res) {
            this.$message({
              message: "用户保存成功",
              type: "success"
            });
            this.addDialog.visible = false;
          } else {
            this.$message({
              message: "用户保存失败",
              type: "warning"
            });
          }
        })
        .catch(err => console.log(err));
    },
    editBaseConfig(val) {
      this.updateAtten(val)
        .then(res => {
          if (res) {
            this.$message({
              message: "数据保存成功",
              type: "success"
            });
            this.editDialog.visible = false;
          } else {
            this.$message({
              message: "数据保存失败",
              type: "warning"
            });
          }
        })
        .catch(err => console.log(err));
    },
    editQuantum(val) {
      this.updateAtten(val)
        .then(res => {
          if (res) {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.quanDialog.visible = false;
          } else {
            this.$message({
              message: "保存失败",
              type: "warning"
            });
          }
        })
        .catch(err => console.log(err));
    },
    deleteAllInfo() {
      const params = this.deleteRow.id;
      this.delAtten(params)
        .then(res => {
          if (res) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.delDialog.visible = false;
          } else {
            this.$message({
              message: "删除失败",
              type: "warning"
            });
          }
        })
        .catch(err => err);
    }
  }
};
</script>
