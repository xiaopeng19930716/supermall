<!--
 * @Descripttion:  实时打卡数据
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-03-25 11:20:04
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-07 02:40:37
 -->
<template>
  <div class="panel">
    <!-- 按钮组 -->
    <el-row>
      <Buttongroup>
        <el-button type="primary" size="mini" icon="el-icon-document" @click="filein">导入</el-button>
        <el-button type="primary" size="mini" icon="el-icon-document" @click="fileout">导出</el-button>
        <el-button type="primary" size="mini" icon="el-icon-plus" @click="add">新增</el-button>
      </Buttongroup>
      <Inputgroup></Inputgroup>
    </el-row>
    <!-- 表格 -->
    <el-row>
      <el-table id="devtable" :data="table" size="mini" height="70vh" border class="table">
        <el-table-column prop="deptnumber" label="序列号"></el-table-column>
        <el-table-column prop="deptname" label="设备名称"></el-table-column>
        <el-table-column prop="parentnumber" label="所属区域"></el-table-column>
        <el-table-column prop="deptperson" label="IP地址"></el-table-column>
        <el-table-column prop="deptphone" label="运行状态"></el-table-column>
        <el-table-column prop="deptphone" label="设备种类"></el-table-column>
        <el-table-column prop="deptphone" label="用户数"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="warning" @click="edit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="del(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 分页器 -->
    <Pagination
      :current-page="pagination.currentPage"
      :page-sizes="pagination.pageSizes"
      :page-size="pagination.pageSize"
      :total="pagination.total"
      @pagesizeChange="sizeChange"
      @currentpageChange="currentChange"
    ></Pagination>
  </div>
</template>
<script>
import { Pagination, Inputgroup, Buttongroup } from "components/index.js";

export default {
  components: {
    Pagination,
    Inputgroup,
    Buttongroup
  },
  data() {
    return {
      table: [],
      pagination: {
        currentPage: 1,
        pageSizes: [50, 100, 200, 400],
        pageSize: 50,
        total: 0
      }
    };
  },
  methods: {
    filein() {},
    fileout() {},
    add() {},
    edit() {},
    del() {}
  }
};
</script>