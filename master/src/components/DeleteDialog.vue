<!--
 * @Descripttion: 每个页面的删除对话框
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-12 23:42:44
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-04-01 10:56:34
 -->
<template>
  <el-dialog :dialog="dialog" :visible.sync="dialog.visible" :width="dialog.width" title="提示" @close="cancelSubmit">
    <span>
      此次操作将删除
      <Strong v-for="(item,key) of name" :key="key">{{item}}&nbsp;&nbsp;</Strong>
    </span>
    <span slot="footer">
      <el-button type="primary" @click="cancelSubmit">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
  export default {
    name: "deletedata",
    props: {
      dialog: { visible: Boolean, width: String },
      row: { id: Array, name: Array }
    },
    computed: {
      id: function () {
        return this.row.id;
      },
      name: function () {
        return this.row.name;
      }
    },
    methods: {
      cancelSubmit() {
        this.dialog.visible = false;
      },
      onSubmit() {
        this.$emit("onSubmit", this.id);
      }
    }
  };
</script>