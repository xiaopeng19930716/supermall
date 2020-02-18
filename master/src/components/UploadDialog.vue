<template>
  <el-drawer
    :dialog="dialog"
    :visible.sync="dialog.visible"
    :direction="dialog.direction"
    :size="dialog.width"
    :destroy-on-close="true"
    :with-header="false"
    :before-close="handleClose"
  >
    <!-- 按钮 -->
    <el-upload
      class="upload"
      action
      :multiple="false"
      :show-file-list="false"
      :limit="1"
      accept=".xlsx, .xls, .csv"
      :http-request="httpRequest"
    >
      <el-button slot="trigger" type="primary">选择文件</el-button>
      <strong>支持XLS/XLXS/CSV</strong>
      <p>
        <strong slot="tip">表头格式：{{dialog.format}}</strong>
      </p>
    </el-upload>
    <Table :data="table" :header="dialog.header"></Table>
    <el-button type="primary" @click="onSubmit">确定导入</el-button>
  </el-drawer>
</template>

<script>
import XLSX from "xlsx";
import Table from "./Table";
import { mapState } from "vuex";
export default {
  props: {
    dialog: {
      visible: Boolean,
      width: String,
      direction: String,
      header: Array,
      format: String
    }
  },
  components: {
    Table
  },
  computed: {
    ...mapState({ alldept: state => state.dept.alldept })
  },
  data() {
    return {
      table: []
    };
  },
  methods: {
    httpRequest(e) {
      // 重置表格
      if (this.table.length !== 0) {
        this.table = [];
      }
      let file = e.file; // 文件信息
      if (!file) {
        // 没有文件
        return false;
      } else if (!/\.(xls|xlsx|csv)$/.test(file.name.toLowerCase())) {
        // 格式根据自己需求定义
        this.$message.error("上传格式不正确，请上传xls,xlsx或者csv格式");
        return false;
      }
      const fileReader = new FileReader();
      fileReader.onload = ev => {
        try {
          const data = ev.target.result;
          const workbook = XLSX.read(data, {
            type: "binary" // 以字符编码的方式解析
          });
          const firstSheet = workbook.SheetNames[0]; // 取第一张表
          const JSONtable = XLSX.utils.sheet_to_json(
            workbook.Sheets[firstSheet]
          ); // 生成json表格内容
          // 将 JSON 数据挂到 表格中 里并弹出通知哪里有问题
          this.table = JSONtable;
        } catch (e) {
          console.log("出错了");
          this.$message({
            message: "数据不符合格式",
            type: "warning"
          });
          return false;
        }
      };
      fileReader.readAsBinaryString(file);
    },
    handleClose(done) {
      this.$confirm("退出不会保存数据确认关闭？")
        .then(_ => {
          done();
          this.table = [];
        })
        .catch(_ => {});
    },
    onSubmit() {
      this.$emit("onSubmit", this.table);
    }
  }
};
</script>
