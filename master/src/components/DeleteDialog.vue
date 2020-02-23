<template>
  <el-dialog
    :dialog="dialog"
    :visible.sync="dialog.visible"
    :width="dialog.width"
    title="提示"
    @close=" cancelSubmit"
  >
    <span>
      此次操作将删除
      <Strong v-for="(item,key) of dialog.username" :key="key">{{item}}&nbsp;&nbsp;</Strong>
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
    dialog: { username: Array, userid: Array, visible: Boolean, width: String }
  },
  methods: {
    cancelSubmit() {
      this.dialog.visible = false;
      this.dialog.username = [];
      this.dialog.userid = [];
    },
    onSubmit() {
      this.$emit("onSubmit", this.dialog.userid);
    }
  }
};
</script>