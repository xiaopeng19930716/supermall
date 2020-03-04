<template>
  <el-dialog
    :title="dialog.title"
    :visible.sync="dialog.visible"
    :width="dialog.width"
    @open="initForm"
  >
    <el-form :model="formData" ref="form" label-width="80px">
      <slot name="formitem"></slot>
    </el-form>
    <span slot="footer">
      <el-button @click="dialog.visible= false">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: "formdialog",
  props: {
    dialog: Object,
    form: Object
  },
  data() {
    return {
      formData: {}
    };
  },
  methods: {
    initForm() {
      this.formData = { ...this.form };
    },
    onSubmit() {
      this.$emit("onSubmit", this.formData);
    }
  }
};
</script>