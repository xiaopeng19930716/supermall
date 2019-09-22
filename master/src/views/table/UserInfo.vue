<template>
  <div style="width:100%;background:white;padding:2px;border-radius:2px">
    <Breadcrumb></Breadcrumb>
    <!-- 按钮组 -->
    <el-row>
      <el-button-group>
        <el-button type="primary" size="small">刷新</el-button>
        <el-button type="primary" size="small">导入</el-button>
        <el-button type="primary" size="small">导出</el-button>
        <el-button type="primary" size="small">新增</el-button>
        <el-button type="primary" size="small">删除</el-button>
      </el-button-group>
      <div style="float:right">
        <el-input placeholder="部门编号" v-model="input" maxlength="5" size="small" style="width:10rem"></el-input>
        <el-button icon="el-icon-search" circle size="small"></el-button>
      </div>
    </el-row>
    <!-- 表格 -->
    <el-row>
      <el-table
        :data="listData"
        lazy
        border
        size="mini"
        height="30rem"
        ref="multipleTable"
        :cell-style="{}"
        :header-cell-style="{}"
      >
        <el-table-column type="selection" width="35"></el-table-column>
        <el-table-column label="个人编号" width="120">
          <template slot-scope="scope">
            <a href="#">{{scope.row.pin}}</a>
          </template>
        </el-table-column>

        <el-table-column label="姓名">
          <template slot-scope="scope">
            <span>{{ scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="部门编号">
          <template slot-scope="scope">
            <span>{{ scope.row.deptnumber}}</span>
          </template>
        </el-table-column>
        <el-table-column label="部门">
          <template slot-scope="scope">
            <span>{{ scope.row.DeptName}}</span>
          </template>
        </el-table-column>

        <el-table-column label="电话" min-width="60">
          <template slot-scope="scope">
            <span>{{ scope.row.mobile}}</span>
          </template>
        </el-table-column>

        <el-table-column label="邮箱">
          <template slot-scope="scope">
            <span>{{ scope.row.email}}</span>
          </template>
        </el-table-column>

        <el-table-column label="在职状态">
          <template slot-scope="scope">
            <span>{{ scope.row.status}}</span>
          </template>
        </el-table-column>
      </el-table>

    </el-row>
    <Pagination></Pagination>
  </div>
</template>


<script>
import Pagination from 'components/Pagination.vue'
import Breadcrumb from 'components/Breadcrumb.vue'
export default {
  components:{
    Pagination,
    Breadcrumb
  },
  data() {
    return {
      multipleSelection: [],
      input: "",
      listData: [],
      count: 0
    };
  },
  beforeCreate() {},
  created() {
    const params = {
      pinlist: "",
      offduty: 0,
      deptnumberlist: "13",
      fetch_child: 0
    };
    const url =
      this.$store.state.baseURL + "/employee/get" + this.$store.state.key;
    this.$http
      .post(url, JSON.stringify(params))
      .then(res => {
         for (let value of res.data.data.items) {
            this.listData.push(value);
        }
        this.count = this.listData.length;
      })
      .catch(err => console.log(err));
  },
  computed: {
    parent: function() {}
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>