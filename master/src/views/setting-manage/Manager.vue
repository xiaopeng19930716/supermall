<!--
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-01 15:01:56
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-19 11:20:10
 -->
<template>
  <!-- 系统用户管理 -->
  <div class="panel">
    <SysUserDialog :dialog="addDialog" @onSubmit="addSysUserAsync"></SysUserDialog>
    <el-row>
      <Buttongroup @handleAdd="handleAddSysUser">
        <el-button type="primary" size="mini" icon="el-icon-document" @click="fileout">导出</el-button>
      </Buttongroup>
      <Inputgroup></Inputgroup>
    </el-row>

    <el-row>
      <Table :header="header" :data="tableData">
        <template #end>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="privi(scope.row)">权限管理</el-button>
              <el-button size="mini" type="success" @click="delUser">删除用户</el-button>
            </template>
          </el-table-column>
        </template>
      </Table>
    </el-row>
    <el-row>
      <Pagination
        :pageSizes="pageSizes"
        @pagesizeChange="pageSizeChange"
        @currentpageChange="currentPageChange"
      ></Pagination>
    </el-row>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { leadout } from "assets/js/common/filesaver.js";
import { Buttongroup, Inputgroup, Table, Pagination } from "components/index";
import { SysUserDialog } from "../../container/sysuser/index";
export default {
  components: {
    Buttongroup,
    Inputgroup,
    Table,
    Pagination,
    SysUserDialog
  },
  data() {
    return {
      pageSizes: [20, 40, 80, 100],
      header: [
        { id: "userno", label: "编号" },
        { id: "username", label: "用户名" },
        { id: "admin", label: "是否超级管理员" },
        { id: "optiontime", label: "最后操作时间" }
      ],
      addDialog: {
        visible: false
      }
    };
  },
  created() {
    // 加载时显示数据库用户信息
    this.setCurrent(1);
    this.setPageSize(20);
    this.getAllSysUserData().then(total => {
      this.setTotal(total);
    });
  },
  computed: {
    ...mapState({
      tableData: state => {
        const current = state.pagi.current;
        const pageSize = state.pagi.pageSize;
        const array = state.sysuser.data;
        array.forEach(element => {
          if (element.username === "admin") {
            element.admin = "是";
          }
        });
        return array.slice((current - 1) * pageSize, current * pageSize);
      }
    })
  },
  methods: {
    ...mapMutations(["setCurrent", "setPageSize", "setTotal"]),
    ...mapActions(["getAllSysUserData", "addSysUserData"]),
    pageSizeChange(val) {
      this.setCurrent(1);
      this.setPageSize(val);
    },
    currentPageChange(val) {
      this.setCurrent(val);
    },
    handleAddSysUser() {
      this.addDialog.visible = true;
    },
    addSysUserAsync(username, password) {
      this.addSysUserData({ username, password }).then(status => {
        if (status) {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.addDialog.visible = false;
        } else {
          this.$message({
            message: "保存失败",
            type: "info"
          });
        }
      });
    },
    delUser() {},
    privi() {},
    fileout() {
      leadout("sysuser", "系统用户");
    }
  }
};
</script>