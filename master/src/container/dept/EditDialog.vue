<template>
  <!-- 动态生成的对话框对话框只有input-->
  <el-dialog
    :dialog="dialog"
    :title="dialog.title"
    :visible.sync="dialog.visible"
    :width="dialog.width"
    @close="resertForm()"
  >
    <el-form label-width="80px" size="small">
      <el-form-item v-for="row in items" :key="row.id" :label="row.label">
        <el-input v-model="row.value" :disabled="row.disable"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button class="button" type="primary" @click="cancelSubmit">取消</el-button>
      <el-button class="button" type="primary" @click="onSubmit">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: "editdialog",
  props: {
    dialog: {
      title: String,
      width: String,
      visible: Boolean
    },
    items: Array
  },
  methods: {
    resertForm() {
      const object = this.rows;
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          object[key].value = "";
        }
      }
    },
    cancelSubmit() {
      this.resertForm();
      this.dialog.visible = false;
    },
    onSubmit() {
      var obj = {};
      this.items.forEach(element => {
        obj[element.id] = element.value;
      });
      this.$emit("onSubmit", obj);
    }
  }
};
</script>
