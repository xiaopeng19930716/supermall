<template>
  <div style="width:100%;background:white;padding:2px;border-radius:2px">
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialog.editvisible">
      <el-form :model="input.form" size="small" :label-position="input.labelPosition">
        <el-form-item label="部门编号" :label-width="dialog.formLabelWidth">
          <el-input disabled v-model="input.form.deptnumber"></el-input>
        </el-form-item>
        <el-form-item label="部门名称" :label-width="dialog.formLabelWidth">
          <el-input v-model="input.form.deptname"></el-input>
        </el-form-item>
        <el-form-item label="上级部门" :label-width="dialog.formLabelWidth">
          <el-input disabled v-model="input.form.parentnumber"></el-input>
        </el-form-item>
        <el-form-item label="部门负责人" :label-width="dialog.formLabelWidth">
          <el-input v-model="input.form.deptperson"></el-input>
        </el-form-item>
        <el-form-item label="部门地址" :label-width="dialog.formLabelWidth">
          <el-input v-model="input.form.deptphone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="makesure">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialog.delvisible" width="30%">
      <span>
        确定删除
        <strong>{{dialog.alertMsg}}</strong>吗
      </span>
      <span slot="footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 面包屑导航 -->
    <Breadcrumb></Breadcrumb>
    <!-- 按钮组 -->
    <el-row style="display:inline">
      <Buttongroup></Buttongroup>
      <Inputgroup></Inputgroup>
    </el-row>
    <!-- 表格 -->
    <el-table :data="table.tableData" height="30rem" border size="mini">
      <el-table-column label="部门编号" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.deptnumber}}</span>
        </template>
      </el-table-column>

      <el-table-column label="部门名称" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.deptname}}</span>
        </template>
      </el-table-column>

      <el-table-column label="上级部门" width>
        <template slot-scope="scope">
          <span>{{ scope.row.parentnumber}}</span>
        </template>
      </el-table-column>

      <el-table-column label="部门负责人" width>
        <template slot-scope="scope">
          <span>{{ scope.row.deptperson}}</span>
        </template>
      </el-table-column>

      <el-table-column label="部门电话" width>
        <template slot-scope="scope">
          <span>{{ scope.row.deptphone}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
import {
  Breadcrumb,
  Pagination,
  Inputgroup,
  Buttongroup,
  Editdialog
} from "components/index.js";
import { getData } from "network/axios.js";
import { setTimeout } from "timers";
export default {
  components: {
    Breadcrumb,
    Pagination,
    Inputgroup,
    Buttongroup,
    Editdialog
  },
  data() {
    return {
      dialog: {
        formLabelWidth: "6rem",
        editvisible: false,
        delvisible: false,
        alertMsg: ""
      },
      input: {
        labelPosition: "left",
        form: {},
        input: "" //输入搜索
      },
      pagination: {
        currentPage: 1,
        pageSizes: [50, 100, 200, 400],
        pageSize: 50,
        total: 0
      },
      table: {
        index: 0,
        allData: [],
        tableData: [],
        multipleSelection: []
      }
    };
  },
  beforeMount() {
    // 接收数据
    const option = "/department/get";
    const params = {
      deptnumber: "1",
      fetch_child: 1
    };
    getData(option, params, res => {
      this.table.allData = res.data.data.items;
      this.pagination.total = res.data.data.count;
      this.table.tableData = this.table.allData.slice(
        0,
        this.pagination.pageSize
      );
    });
  },

  methods: {
    // 编辑
    handleEdit(index, row) {
      this.dialog.editvisible = true;
       this.table.index = index;
      // 不能直接赋值 需要拷贝对象
      let string = JSON.stringify(row);
      this.input.form = JSON.parse(string);
      // const option = "/department/update";
      // const params = row;
      // getData();
    },
    // 删除
    handleDelete(index, row) {
      console.log(index, row);
      this.table.index = index;
      this.dialog.delvisible = true;
      this.dialog.alertMsg = row.deptname;
    },
    cancel() {
      this.dialog.editvisible = false;
      this.dialog.delvisible = false;
    },
    makesure() {
      // 本地更新
      this.table.tableData[this.table.index] = this.input.form;
      this.$message("更新部门信息成功");
      this.dialog.editvisible = false;
    },
    confirm() {
      // 本地删除
      delete this.table.tableData[this.table.index];
      this.$message("删除成功");
      this.dialog.delvisible = false;
    },
    // 每页大小改变
    sizeChange(val) {
      this.pagination.currentPage = 1;
      this.table.tableData = this.table.allData.slice(0, val);
      this.pagination.pageSize = val;
    },
    // 当前页改变
    currentChange(val) {
      this.pagination.currentPage = val;
      this.table.tableData = this.table.allData.slice(
        (this.pagination.currentPage - 1) * this.pagination.pageSize,
        this.pagination.currentPage * this.pagination.pageSize
      );
    }
  }
};
</script>