<template>
  <!-- 部门页面的增加 -->
  <el-dialog
    :title="dialog.title"
    :visible.sync="dialog.visible"
    :width="dialog.width"
    @close="resertForm()"
  >
    <el-form :model="form" ref="form" label-width="80px">
      <slot></slot>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "adddialog",
  props: {
    dialog: {
      title: String,
      visible: Boolean,
      width: String
    },
    items: Array
  },
  computed: {
    ...mapState({ config: state => state.dialogform.config })
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