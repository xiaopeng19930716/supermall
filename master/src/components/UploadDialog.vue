<!--
 * @Descripttion: 上传文件插件
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-07 23:00:41
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-04-05 19:16:55
 -->
<template>
  <el-drawer :dialog="dialog" :visible.sync="dialog.visible" :direction="dialog.direction" :size="dialog.width"
    :destroy-on-close="true" :with-header="false" :before-close="handleClose">
    <!-- 按钮 -->
    <el-upload class="upload" action :multiple="false" :limit="2" :file-list="fileList" :show-file-list="false"
      :on-change="handleChange" accept=".xlsx, .xls, .csv" :http-request="httpRequest">
      <el-button slot="trigger" type="primary">选择文件</el-button>
      <strong>支持XLS/XLXS/CSV</strong>
      <p>
        <strong slot="tip">表头格式：{{dialog.format}}</strong>
      </p>
      <Table :data="table" :header="dialog.header"></Table>
      <el-button type="primary" @click="onSubmit">确定导入</el-button>
      <el-button type="primary" @click="resetTable">重置表格</el-button>
      <p>{{dialog.error}}</p>
    </el-upload>
  </el-drawer>
</template>

<script>
  import XLSX from "xlsx";
  import Table from "./Table";
  export default {
    props: {
      dialog: {
        visible: Boolean,
        width: String,
        direction: String,
        header: Array,
        format: String,
        error: String
      }
    },
    components: {
      Table
    },

    data() {
      return {
        table: [],
        fileList: []
      };
    },
    methods: {
      httpRequest(e) {
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
            // 检查表格 待完成
            this.$emit("checkData", this.table);
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
            this.dialog.error = "";
          })
          .catch(_ => { });
      },
      resetTable() {
        this.table = [];
        this.dialog.error = "";
      },
      // 连续选择文件时用后面的文件替换前面的文件
      handleChange(file, fileList) {
        if (fileList.length > 0) {
          this.fileList = [fileList[fileList.length - 1]];
        }
        this.dialog.error = "";
      },
      // 这里将当前组件实例当参数传入
      // 就可以使用实例中定义的一些属性、方法
      // 补充一下，这里如果换成非箭头函数的写法，也可以直接访问实例。
      onSubmit() {
        if (this.table.length) {
          this.$emit("onSubmit", this.table);
        } else {
          this.$notify({
            title: "错误",
            message: "未选择文件或文件无任何内容",
            type: "error"
          });
        }
      }
    }
  };
</script>