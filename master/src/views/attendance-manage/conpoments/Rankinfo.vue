<!--
 * @Descripttion: 班次信息
 * @version: 
 * @Author: 肖鹏
 * @Date: 2020-04-06 17:43:31
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-28 16:19:47
 -->
<template>
  <!-- 动态生成的对话框对话框只有input-->
  <el-drawer
    :dialog="dialog"
    :title="dialog.title"
    :visible.sync="dialog.visible"
    :size="dialog.width"
    :direction="dialog.label"
    @close="cancelSubmit('editquan')"
  ></el-drawer>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "Rankinfo",
  props: {
    dialog: {
      title: String,
      width: String,
      visible: Boolean,
      label: String
    }
  },
  data () {
    return {};
  },

  methods: {
    onSubmit (formName) {
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

.el-input,
.el-input-number,
.el-select {
  width: 220px;
}
</style>