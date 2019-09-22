<template>
  <div style="width:100%;background:white;padding:2px;border-radius:2px">
    <!-- 对话框 -->
    
    <!-- 面包屑导航 -->
    <Breadcrumb></Breadcrumb>
    <!-- 按钮组 -->
    <el-row>
      <Buttongroup></Buttongroup>
      <Inputgroup></Inputgroup>
    </el-row>
    <!-- 表格 -->
    <el-row>
      <el-table
        :data="listData"
        lazy
        border
        size="mini"
        height="75vh"
        ref="multipleTable"
        :cell-style="{}"
        :header-cell-style="{}"
      >
        <el-table-column type="selection" width="35"></el-table-column>
        <el-table-column label="部门编号" width="120">
          <template slot-scope="scope">
            <a href="#">{{scope.row.deptnumber}}</a>
          </template>
        </el-table-column>

        <el-table-column label="部门名称">
          <template slot-scope="scope">
            <span>{{ scope.row.deptname}}</span>
          </template>
        </el-table-column>

        <el-table-column label="上级部门">
          <template slot-scope="scope">
            <span>{{ scope.row.parentnumber}}</span>
          </template>
        </el-table-column>

        <el-table-column label="负责人电话" min-width="60">
          <template slot-scope="scope">
            <span>{{ scope.row.deptphone}}</span>
          </template>
        </el-table-column>
        <el-table-column label="部门地址">
          <template slot-scope="scope">
            <span>{{ scope.row.deptaddr}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 分页器 -->
    <Pagination :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" :total="total" @sizeChange="sizeChange" @currentChange="currentChange"></Pagination>
  </div>
</template>


<script>
import {Breadcrumb,Pagination,Inputgroup,Buttongroup,Dialog} from 'components/index.js'
export default {
  components: {
    Breadcrumb,
    Pagination,
    Inputgroup,
    Buttongroup,
    Dialog,
  },
  data() {
    return {
      currentPage:1,
      pageSizes:[50,100,200,400],
      pageSize:50,
      total: 0,
      input: "", //输入搜索
      data:[],
      listData: [],
      multipleSelection: []
    };
  },
  beforeMount() {
    // 接收数据
    const params = {
      deptnumber: "1",
      fetch_child: 1
    };
    const url =
      this.$store.state.baseURL + "/department/get" + this.$store.state.key;
    this.$http
      .post(url, JSON.stringify(params))
      .then(res => {
        this.data = res.data.data.items
        this.total = this.data.length;
        this.listData = this.data.slice(0,this.pageSize);
      })
      .catch(err => console.log(err));
  },

  methods: {
    // 表格全选
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
    },
    // 分页器
    // 每页数量改变时 val每页数目
    sizeChange(val){
      console.log(this.currentPage)
      this.currentPage=1;
      this.listData = this.data.slice(0,val);
      this.pageSize = val;
    },
    // 当前页改变时val 当前页数
    currentChange(val){
      this.currentPage = val;
      console.log(this.currentPage);
      this.listData = this.data.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
    }
  }
};
</script>