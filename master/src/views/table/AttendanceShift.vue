<template>
  <!-- 班次管理 -->
  <div class="panel">
    <!-- 添加基本配置弹框 -->
    <BaseConfigDialog :dialog="addDialog" @onSubmit="addBaseConfigAsync"></BaseConfigDialog>
    <!-- 编辑基本配置对话框 -->
    <BaseConfigDialog :dialog="editDialog" :form="defaultConfig" @onSubmit="editBaseConfigAsync"></BaseConfigDialog>
    <!-- 班次详情 -->
    <QuantumDrawer :dialog="quanDialog" :form="quanInfo" @onSubmit="editQuantumAsync"></QuantumDrawer>
    <!-- 确认删除弹框 -->
    <DeleteDialog :dialog="delDialog" :row="deleteRow" @onSubmit="delAllInfoAsync"></DeleteDialog>
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
      <MultipleTable :header="header" :data="tableData" ref="multiTable">
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
      </MultipleTable>
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
  MultipleTable,
  DeleteDialog
} from "components/index.js";
import { BaseConfigDialog, QuantumDrawer } from "container/atten/index";
export default {
  components: {
    Pagination,
    Buttongroup,
    MultipleTable,
    BaseConfigDialog,
    QuantumDrawer,
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
      defaultConfig: {},
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
      tableData: state => {
        const current = state.pagi.current;
        const pageSize = state.pagi.pageSize;
        let array = state.atten.data;
        if (array.length) {
          array = array.slice((current - 1) * pageSize, current * pageSize);
          return array;
        }
      }
    })
  },
  created() {
    this.setPageSize(20);
    this.getAttenData().then(total => {
      this.setTotal(total);
    });
  },
  methods: {
    ...mapMutations(["setPageSize", "setCurrent", "setTotal"]),
    ...mapActions([
      "getAttenData",
      "updateAttenData",
      "delAttenData",
      "insertAttenData"
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
    // 增加基本配置
    handleAddBaseConfig() {
      this.addDialog.visible = true;
    },
    // 编辑基本配置
    handleEditBaseConfig(index, row) {
      this.editDialog.visible = true;
      this.defaultConfig = { ...row };
      this.defaultConfig.rank = [row.rankstart, row.rankend];
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
      const selectItem = this.$refs["multiTable"].multipleSelection;
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
    addBaseConfigAsync(val) {
      this.insertAttenData(val)
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
    editBaseConfigAsync(val) {
      this.updateAttenData(val)
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
    editQuantumAsync(val) {
      this.updateAttenData(val)
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
    delAllInfoAsync() {
      const params = this.deleteRow.id;
      this.delAttenData(params)
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
