<template>
  <!-- 班次管理 -->
  <div class="panel">
    <!-- 班次详情 -->
    <RankInfo :dialog="rankDialog"></RankInfo>
    <ArrangeDept :visible="true"></ArrangeDept>
    <!-- 确认删除弹框 -->
    <!-- 按钮组 -->
    <el-row>
      <Buttongroup @handleAdd="handleAddBaseConfig" :isFileIn="false">
        <template #end>
          <el-button type="primary" size="mini" @click="handleArrngeByDept">部门排班</el-button>
          <el-button type="primary" size="mini">人员排班</el-button>
          <el-button type="primary" size="mini">清除排班</el-button>
        </template>
      </Buttongroup>
      <DeptPicker style="float:right" @deptPicked="getUserByDept"></DeptPicker>
    </el-row>
    <!-- 表格 -->
    <el-row>
      <MultipleTable :header="header" :data="tableData">
        <template #end>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleViewRank(scope.row)">排班详情</el-button>
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
import { Pagination, Buttongroup, MultipleTable } from "components/index.js";
import { ArrangeDept, RankInfo } from "container/arrange/index";
import { DeptPicker } from "container/dept/index";
export default {
  components: {
    Pagination,
    Buttongroup,
    MultipleTable,
    DeptPicker,
    ArrangeDept,
    RankInfo
  },
  data() {
    return {
      header: [
        { id: "userid", label: "人员编号" },
        { id: "name", label: "人员姓名" },
        { id: "deptname", label: "所属部门", width: "180px" },
        { id: "rankname", label: "所选班次", width: "180px" }
      ],
      rankInfo: {},
      rankDialog: {
        title: "班次详情",
        visible: false,
        width: "50%",
        label: "rtl"
      },
      selectRow: {},
      editDialog: {
        title: "编辑配置",
        visible: false,
        width: "500px"
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
      tableData: state => state.arrange.arrangeData
    })
  },
  created() {
    this.setPageSize(20);
    this.getArrangeByDept("总公司");
  },
  methods: {
    ...mapMutations(["setPageSize", "setCurrent"]),
    ...mapActions([
      "getArrangeByDept",
      "updateAtten",
      "delAtten",
      "insertAtten"
    ]),
    //  每页大小改变
    sizeChange(val) {
      this.setPageSize(val);
    },
    // 当前页改变
    currentChange(val) {
      this.setCurrent(val);
    },
    handleArrngeByDept() {},
    handleViewRank() {
      this.rankDialog.visible = true;
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
    },
    getUserByDept() {}
  }
};
</script>
