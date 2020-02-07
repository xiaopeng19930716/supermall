<template>
  <div>
    <!-- 按钮 -->
    <el-upload
      class="upload"
      action
      :multiple="false"
      :limit="1"
      accept=".xlsx, .xls, .csv"
      :http-request="httpRequest"
      @submit="submit"
    >
      <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
      <div slot="tip" class="el-upload__tip">选择xlsx/xls/csv文件</div>
    </el-upload>
  </div>
</template>

<script>
import XLSX from 'xlsx';
export default {
  data() {
    return {
      table:[] 
    };
  },
  methods: {
    httpRequest(e) {
      let file = e.file; // 文件信息
      console.log("e: ", e);
      console.log("file: ", e.file);
      if (!file) {
        // 没有文件
        return false;
      } else if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
        // 格式根据自己需求定义
        this.$message.error("上传格式不正确，请上传xls或者xlsx格式");
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
          const JSONtable = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet]); // 生成json表格内容
          console.log(JSONtable);
          // 将 JSON 数据挂到 data 里
          this.table = JSONtable;
        } catch (e) {
          console.log("出错了：：");
          return false;
        }
      };
      fileReader.readAsBinaryString(file);
    },
  }
};
</script>
