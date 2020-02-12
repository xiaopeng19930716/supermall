<template>
  <el-dialog :dialog="dialog" :visible.sync="dialog.visible" :width="dialog.width" title="提示">
    <span>
      此次操作将删除
      <Strong>{{dialog.msg}}</Strong>
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
    dialog: { msg: String, visible: Boolean, width: String, data: Object }
  },
  methods: {
    cancelSubmit() {
      this.dialog.visible = false;
    },
    onSubmit() {
      this.$emit("onSubmit");
    }
  }
};
</script>