<template>
  <!-- 动态生成的对话框插件 -->
  <el-dialog
    :title="dialog.title"
    :visible.sync="dialog.visible"
    :width="dialog.width"
    @close="resertForm()"
  >
    <el-form :model="dialogform" label-width="80px">
      <el-form-item
        v-for="(row, index) in dialogform.rows"
        :key="index"
        :label="row.label"
        type="mini"
      >
        <el-input v-model="row.value" :disabled="row.disable" type="mini"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="cancelSubmit">取消</el-button>
      <el-button type="primary" @click="onSubmit">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: "formdialog",
  props: {
    dialog: {
      title: String,
      visible: Boolean,
      width: String
    },
    dialogform: {
      name: String,
      rows: Array
    }
  },
  methods: {
    resertForm() {
      const object = this.dialogform.rows;
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
      var form = [];
      const object = this.dialogform.rows;
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          const element = object[key].value;
          form.push(element);
        }
      }
      console.log(form);
      this.$emit("onSubmit", form);
    }
  }
};
</script>