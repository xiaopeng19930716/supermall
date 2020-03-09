<template>
  <!-- 时间段管理 -->
  <div class="panel">
    <DeleteDialog :dialog="delDialog" :row="deleteRow" @onSubmit="delQuantumAsync"></DeleteDialog>
    <QuantumDialog :dialog="addDialog" @onSubmit="addQuantumAsync"></QuantumDialog>
    <QuantumDialog :dialog="editDialog" :form="editForm" @onSubmit="updateQuantumAsync"></QuantumDialog>
    <el-button-group>
      <el-button type="primary" size="mini" @click="handleDeleteQuantum">删除</el-button>
      <el-button type="primary" size="mini" @click="handleAddQuantum">增加</el-button>
    </el-button-group>
    <MultipleTable :header="header" :data="tableData" ref="multipleTable">
      <template #end>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEditQuantum(scope.row)">时间段详情</el-button>
          </template>
        </el-table-column>
      </template>
    </MultipleTable>
    <Pagination
      :pageSizes="pageSizes"
      @pagesizeChange="pageSizeChange"
      @currentpageChange="currentPageChange"
    ></Pagination>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { Pagination, DeleteDialog, MultipleTable } from "components/index.js";
import { QuantumDialog } from "container/quantum/index";
export default {
  components: {
    Pagination,
    QuantumDialog,
    DeleteDialog,
    MultipleTable
  },
  data() {
    return {
      header: [
        { id: "quanid", label: "时间段编号" },
        { id: "quanname", label: "时间段名称", width: "180px" },
        { id: "quanstart", label: "上班时间", width: "100px" },
        { id: "firststart", label: "中途休息开始", width: "100px" },
        { id: "firstend", label: "中途休息结束", width: "100px" },
        { id: "quanend", label: "下班时间", width: "100px" },
        { id: "signin", label: "必须签到" },
        { id: "signoff", label: "必须签退" }
      ],
      editDialog: {
        visible: false,
        title: "编辑时间段",
        width: "850px"
      },
      editForm: {},
      addDialog: {
        visible: false,
        title: "增加时间段",
        width: "850px"
      },
      delDialog: {
        visible: false,
        title: "提示"
      },
      deleteRow: {
        id: [],
        name: []
      },
      pageSizes: [10, 20, 40, 80]
    };
  },
  computed: {
    ...mapState({
      tableData: state => {
        const current = state.pagi.current;
        const pageSize = state.pagi.pageSize;
        let array = state.quan.data;
        if (array.length) {
          array = array.slice((current - 1) * pageSize, current * pageSize);
          return array;
        }
      }
    })
  },
  created() {
    this.setPageSize(20);
    this.getAllQuantum().then(total => {
      this.setTotal(total);
    });
  },
  methods: {
    ...mapMutations(["setPageSize", "setCurrent", "setTotal"]),
    ...mapActions([
      "getAllQuantum",
      "updateQuanData",
      "insertQuanData",
      "delQuanData"
    ]),
    pageSizeChange(val) {
      this.setCurrent(1);
      this.setPageSize(val);
    },
    currentPageChange(val) {
      this.setCurrent(val);
    },
    handleAddQuantum() {
      this.addDialog.visible = true;
    },
    addQuantumAsync(val) {
      this.insertQuanData(val).then(res => {
        if (res) {
          this.addDialog.visible = false;
          this.$message({
            message: "增加成功",
            type: "success"
          });
        } else {
          this.$message({
            message: "添加失败",
            type: "warning"
          });
        }
      });
    },
    handleEditQuantum(val) {
      this.editDialog.visible = true;
      this.editForm = JSON.parse(JSON.stringify(val));
    },
    updateQuantumAsync(val) {
      this.updateQuanData(val).then(res => {
        if (res) {
          this.editDialog.visible = false;
          this.$message({
            message: "保存成功",
            type: "success"
          });
        } else {
          this.$message({
            message: "保存失败",
            type: "warning"
          });
        }
      });
    },
    handleDeleteQuantum() {
      const selectRows = this.$refs["multipleTable"].multipleSelection;
      if (selectRows.length === 0) {
        this.$message({
          message: "未选择任何时间段",
          type: "warning"
        });
      } else {
        this.delDialog.visible = true;
        const username = [];
        const userid = [];
        for (const iterator of selectRows) {
          username.push(iterator.quanname);
          userid.push(iterator.quanid);
        }
        this.deleteRow.name = username;
        this.deleteRow.id = userid;
      }
    },
    delQuantumAsync(val) {
      this.delQuanData(val).then(res => {
        if (res) {
          this.delDialog.visible = false;
          this.$message({
            message: "删除成功",
            type: "success"
          });
        } else {
          this.$message({
            message: "删除失败",
            type: "warning"
          });
        }
      });
    }
  }
};
</script>