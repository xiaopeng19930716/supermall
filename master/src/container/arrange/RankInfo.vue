<template>
  <!-- 动态生成的对话框对话框只有input-->
  <el-drawer
    :dialog="dialog"
    :title="dialog.title"
    :visible.sync="dialog.visible"
    :size="dialog.width"
    :direction="dialog.label"
    @close="cancelSubmit('editquan')"
  >
    <Chart></Chart>
  </el-drawer>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { Chart } from "components/index";
export default {
  name: "rankinfo",
  components: {
    Chart
  },
  props: {
    dialog: {
      title: String,
      width: String,
      visible: Boolean,
      label: String
    }
  },
  data() {
    return {};
  },

  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit("onSubmit", this.quan);
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.form {
  display: flex;
}

.left {
  width: 35%;
}

.right {
  width: 55%;
}

.el-input, .el-input-number, .el-select {
  width: 220px;
}
</style>