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
        <el-button type="primary" size="small" @click="cancel">取 消</el-button>
        <el-button type="warning" size="small" @click="makesure">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialog.delvisible" width="30%">
      <span>
        确定删除
        <strong>{{dialog.alertMsg}}</strong>吗
      </span>
      <span slot="footer">
        <el-button type="primary" size="small" @click="cancel">取 消</el-button>
        <el-button type="danger" size="small" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
      <!-- 增加部门 后台不允许增加部门 -->
    <el-dialog :visible.sync="dialog.addvisible">
      <el-form :model="input.add" size="small" :label-position="input.labelPosition">
        <el-form-item label="部门编号" :label-width="dialog.formLabelWidth">
          <el-input v-model="input.add.deptnumber"></el-input>
        </el-form-item>
        <el-form-item label="部门名称" :label-width="dialog.formLabelWidth">
          <el-input v-model="input.add.deptname"></el-input>
        </el-form-item>
        <el-form-item label="上级部门" :label-width="dialog.formLabelWidth">
          <el-input v-model="input.add.parentnumber"></el-input>
        </el-form-item>
        <el-form-item label="部门负责人" :label-width="dialog.formLabelWidth">
          <el-input v-model="input.add.deptperson"></el-input>
        </el-form-item>
        <el-form-item label="部门地址" :label-width="dialog.formLabelWidth">
          <el-input v-model="input.add.deptphone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="cancel">取 消</el-button>
        <el-button type="warning" size="small" @click="add">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 面包屑导航 -->
    <!-- <Breadcrumb></Breadcrumb> -->
    <!-- 按钮组 -->
    <el-row>
      <Buttongroup>
        <el-button type="primary" size="mini" icon="el-icon-document" @click="leadin">导入</el-button>
        <el-button type="primary" size="mini" icon="el-icon-document" @click="leadout">导出</el-button>
        <el-button type="primary" size="mini" icon="el-icon-plus" @click="add">新增</el-button>
      </Buttongroup>
      <Inputgroup></Inputgroup>
    </el-row>
    <!-- 表格 -->
    <el-row>
      <el-table id="table-content" :data="table.tableData" size="mini" height="40.5rem" border style="margin:2px 1px">
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
import {
  Breadcrumb,
  Pagination,
  Inputgroup,
  Buttongroup,
  Editdialog
} from "components/index.js";
import { getData } from "network/axios.js";
import FileSaver from "file-saver";
import XLSX from "xlsx";
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
      bread:{
        blist:[]
      },
      dialog: {
        formLabelWidth: "8rem",
        editvisible: false,
        delvisible: false,
        addvisible:false,
        alertMsg: ""
      },
      input: {
        labelPosition: "left",
        form: {},
        add:{
          deptnumber:"",
          deptname:"",
          parentnumber:"",
          deptperson:"",
          deptphone:"",
        },
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
    leadin() {},
    leadout() {
      let et = XLSX.utils.table_to_book(
        document.getElementById("table-content")
      ); //此处传入table的DOM节点
      let etout = XLSX.write(et, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([etout], {
            type: "application/octet-stream"
          }),
          "trade-publish.xlsx"
        ); //trade-publish.xlsx 为导出的文件名
      } catch (e) {
        console.log(e, etout);
      }
      return etout;
    },
    add() {
      this.dialog.addvisible = true;
      this.table.tableData.push(this.input.add);
    }
  }
};
</script>