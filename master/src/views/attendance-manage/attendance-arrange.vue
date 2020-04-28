<template>
  <!-- 人员排班管理 -->
  <div class="panel">
    <!-- 人员班次详情 -->
    <RankInfo :dialog="rankDialog"></RankInfo>
    <!-- 按部门排班 -->
    <ArrangeDept
      :dialog="arrangeDialog"
      @onSubmit="arrangeByDeptAsync"
    ></ArrangeDept>
    <!-- 按人员排班 -->
    <ArrangePerson
      :dialog="personDialog"
      @onSubmit="arrangeByPersonAsync"
    ></ArrangePerson>
    <!-- 清除部门下排班信息 -->
    <DeleteDialog
      :dialog="clearDialog"
      :row="clearRow"
      @onSubmit="clearArrangeAsync"
    ></DeleteDialog>
    <!-- 按钮组 -->
    <el-row>
      <Buttongroup :isFileIn="false">
        <template #end>
          <el-button
            type="primary"
            size="mini"
            @click="handleArrangeByDept"
          >部门排班</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="handleArrangeByPerson"
          >人员排班</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="handleClearArrange"
          >清除排班</el-button>
        </template>
      </Buttongroup>
      <DeptPicker
        style="float:right"
        @handleSelectChange="getUserByDeptAsync"
        ref="deptpick"
      ></DeptPicker>
    </el-row>
    <!-- 表格 -->
    <el-row>
      <MultipleTable
        :header="header"
        :data="tableData"
        ref="multiTable"
      >
        <template #end>
          <el-table-column
            fixed="right"
            label="操作"
            width="100"
          >
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="handleViewRank(scope.row)"
              >排班详情</el-button>
            </template>
          </el-table-column>
        </template>
      </MultipleTable>
    </el-row>
    <!-- 分页器 -->
    <Pagination
      :page-sizes="sizes"
      @pagesizeChange="sizeChange"
      @currentpageChange="currentChange"
    ></Pagination>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import {
  Pagination,
  Buttongroup,
  MultipleTable,
  DeleteDialog
} from "components/index.js";
import DeptPicker from "../person-manage/conpoments/DeptPicker";
import ArrangeByDept from './conpoments/ArrangeByDept'
import ArrangeByUser from './conpoments/ArrangeByUser'
export default {
  components: {
    Pagination,
    Buttongroup,
    MultipleTable,
    DeleteDialog,
    DeptPicker,
    ArrangeByDept,
    ArrangeByUser,
    RankInfo,

  },
  data () {
    return {
      header: [
        { id: "userid", label: "人员编号", width: "150px" },
        { id: "name", label: "人员姓名" },
        { id: "deptname", label: "所属部门", width: "180px" },
        { id: "rankname", label: "所选班次", width: "180px" },
        { id: "atten", label: "是否参与排班" }
      ],
      rankInfo: {},
      rankDialog: {
        title: "班次详情",
        visible: false,
        width: "50%",
        label: "rtl"
      },
      arrangeDialog: {
        visible: false
      },
      personDialog: {
        visible: false
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
      queryInfo: {
        deptName: "总公司",
        nameOrNo: ""
      },
      clearDialog: {
        visible: false
      },
      clearRow: {
        id: [],
        name: []
      },
      // 分页器设置
      sizes: [20, 40, 80, 100]
    };
  },
  computed: {
    ...mapState({ tableData: state => state.user.data })
  },
  created () {
    this.setCurrent(1);
    this.setPageSize(20);
    this.getUserDataByDept(this.queryInfo);
  },
  methods: {
    ...mapMutations(["setPageSize", "setCurrent"]),
    ...mapActions([
      "getUserDataByDept",
      "updateArrangeDataByPerson",
      "updateArrangeDataByDept",
      "clearArrangeData"
    ]),
    //  每页大小改变
    sizeChange (val) {
      this.setCurrent(1);
      this.setPageSize(val);
      this.getUserDataByDept(this.queryInfo);
    },
    // 当前页改变
    currentChange (val) {
      this.setCurrent(val);
      this.getUserDataByDept(this.queryInfo);
    },
    getUserByDeptAsync (val) {
      this.setCurrent(1);
      this.queryInfo.deptName = val;
      this.getUserDataByDept(this.queryInfo);
    },
    handleArrangeByDept () {
      this.arrangeDialog.visible = true;
    },
    arrangeByDeptAsync (deptname, rankname) {
      this.updateArrangeDataByDept({ deptname, rankname })
        .then(res => {
          if (res) {
            this.$message({
              message: "更改成功",
              type: "success"
            });
            this.arrangeDialog.visible = false;
          } else {
            this.$message({
              message: "更新失败",
              type: "success"
            });
          }
        })
        .catch(err => console.log(err));
    },
    handleArrangeByPerson () {
      const personSelect = this.$refs["multiTable"].multipleSelection;
      if (personSelect.length) {
        this.personDialog.visible = true;
      } else {
        this.$message({
          message: "未选择任何用户",
          type: "info"
        });
      }
    },
    arrangeByPersonAsync (val) {
      let person = this.$refs["multiTable"].multipleSelection;
      person = JSON.parse(JSON.stringify(person));
      person.forEach(element => {
        element.rankname = val;
        element.atten = "是";
      });
      this.updateArrangeDataByPerson(person)
        .then(res => {
          if (res) {
            this.$message({
              message: "更改成功",
              type: "success"
            });
            this.personDialog.visible = false;
          } else {
            this.$message({
              message: "更新失败",
              type: "success"
            });
          }
        })
        .catch(err => console.log(err));
    },
    handleViewRank () {
      this.rankDialog.visible = true;
    },
    handleClearArrange () {
      this.clearDialog.visible = true;
      this.clearRow.name = [];
      this.clearRow.id = [];
      const personSelect = this.$refs["multiTable"].multipleSelection;
      if (personSelect.length === 0) {
        this.clearRow.name[0] = this.$refs["deptpick"].deptSelect;
      } else {
        this.clearRow.name = personSelect.map(e => e.name);
        this.clearRow.id = personSelect.map(e => e.userid);
      }
    },
    clearArrangeAsync (val) {
      const deptName = this.clearRow.name[0];
      const params = {
        userId: val,
        deptName: deptName
      };
      this.clearArrangeData(params).then(res => {
        if (res) {
          this.$message({
            message: "清除成功",
            type: "info"
          });
          this.clearDialog.visible = false;
        } else {
          this.$message({
            message: "清除失败",
            type: "info"
          });
        }
      });
    }
  }
};
</script>
