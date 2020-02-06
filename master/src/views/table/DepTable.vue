<template>
  <!-- 部门管理 -->
  <div class="panel">
    <!-- 增加部门弹框 -->
    <el-dialog :visible.sync="dialog.addvisible">
      <el-form :model="addform" size="small" label-width="90px" label-position="left">
        <el-form-item label="部门编号">
          <el-input v-model="addform.deptnumber"></el-input>
        </el-form-item>
        <el-form-item label="部门名称">
          <el-input v-model="addform.deptname"></el-input>
        </el-form-item>
        <el-form-item label="上级部门">
          <el-input v-model="addform.parentnumber"></el-input>
        </el-form-item>
        <el-form-item label="部门负责人">
          <el-input v-model="addform.deptperson"></el-input>
        </el-form-item>
        <el-form-item label="部门地址">
          <el-input v-model="addform.deptphone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="cancel">取 消</el-button>
        <el-button type="warning" size="small" @click="add">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑部门对话框 -->
    <el-dialog :visible.sync="dialog.editvisible">
      <el-form :model="editform" size="small" label-width="100px">
        <el-form-item label="部门编号">
          <el-input disabled v-model="editform.deptnumber"></el-input>
        </el-form-item>
        <el-form-item label="部门名称">
          <el-input v-model="editform.deptname"></el-input>
        </el-form-item>
        <el-form-item label="上级部门">
          <el-input disabled v-model="editform.parentnumber"></el-input>
        </el-form-item>
        <el-form-item label="负责人">
          <el-input v-model="editform.deptperson"></el-input>
        </el-form-item>
        <el-form-item label="部门地址">
          <el-input v-model="editform.deptphone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="cancel">取 消</el-button>
        <el-button type="warning" size="small" @click="makesure">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 确认弹框 -->
    <el-dialog :visible.sync="dialog.delvisible">
      <span>
        确定删除
        <strong>{{dialog.alertMsg}}</strong>吗
      </span>
      <span slot="footer">
        <el-button type="primary" size="small" @click="cancel">取 消</el-button>
        <el-button type="danger" size="small" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 面包屑导航 -->
    <!-- <Breadcrumb></Breadcrumb> -->
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
      <el-table
        id="deptable"
        :data="table.tableData"
        size="mini"
        height="70vh"
        border
        class="table"
      >
        <el-table-column prop="deptnumber" label="部门编号" width="100"></el-table-column>
        <el-table-column prop="deptname" label="部门名称" width="200"></el-table-column>
        <el-table-column prop="parentnumber" label="上级部门" width="180"></el-table-column>
        <el-table-column prop="deptperson" label="部门负责人" width="180"></el-table-column>
        <el-table-column prop="deptphone" label="部门电话"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="warning" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
import { getData } from "network/axios.js";
import {leadin,leadout} from "assets/js/common/filesaver";
import {
  Breadcrumb,
  Pagination,
  Inputgroup,
  Buttongroup,
  Editdialog
} from "components/index.js";

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
      bread: {
        blist: []
      },
      dialog: {
        editvisible: false,
        delvisible: false,
        addvisible: false,
        alertMsg: ""
      },
      addform: {
        deptnumber: "",
        deptname: "",
        parentnumber: "",
        deptperson: "",
        deptphone: ""
      },
      editform: {
        deptnumber: "",
        deptname: "",
        parentnumber: "",
        deptperson: "",
        deptphone: ""
      },
      //输入搜索
      input: "",
      // 分页器设置
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
      const string = JSON.stringify(row);
      this.editform = JSON.parse(string);
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
      this.dialog.addvisible = false;
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
    },
    add() {
      this.dialog.addvisible = true;
      this.table.tableData.push(this.addform);
    },
    filein(){
      leadin("deptable")
    },
    fileout(){
      leadout("deptable","部门表")
    }
  }
};
</script>
