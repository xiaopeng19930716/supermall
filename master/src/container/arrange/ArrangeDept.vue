<!--
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-03-04 16:42:05
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-05 13:13:48
 -->
<template>
  <!-- 动态生成的对话框对话框只有input-->
  <el-dialog title="部门排班" :visible.sync="dialog.visible" width="30%">
    <el-form label-width="80px">
      <el-form-item label="选择部门">
        <DeptPicker ref="deptpicker"></DeptPicker>
      </el-form-item>
      <el-form-item label="选择班次">
        <AttenPicker ref="rankpiceker"></AttenPicker>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { DeptPicker } from "container/dept/index";
import { AttenPicker } from "container/atten/index";
export default {
  name: "editdialog",
  components: {
    DeptPicker,
    AttenPicker
  },
  props: {
    dialog: {
      visible: Boolean
    }
  },

  data() {
    return {
      formData: {}
    };
  },
  methods: {
    onSubmit(formName) {
      const deptName = this.$refs.deptpicker.deptSelect;
      const rankName = this.$refs.rankpiceker.rankSelect;
      this.$emit("onSubmit", deptName, rankName);
    }
  }
};
</script>
