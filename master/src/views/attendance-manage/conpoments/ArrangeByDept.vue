<!--
 * @Descripttion:按部门排班 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-03-04 16:42:05
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-28 19:07:48
 -->
<template>
  <!-- 动态生成的对话框对话框只有input-->
  <el-dialog
    title="部门排班"
    :visible.sync="dialog.visible"
    width="30%"
    @closed="cancelSubmit"
  >
    <el-form label-width="80px">
      <el-form-item label="选择部门">
        <DeptPicker
          ref="deptpicker"
          defaultSelect="总公司"
        ></DeptPicker>
      </el-form-item>
      <el-form-item label="选择班次">
        <AttendancePicker
          ref="rankpiceker"
          defaultSelect="默认班次"
        ></AttendancePicker>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button
        type="primary"
        @click="onSubmit"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import DeptPicker from "views/person-manage/conpoments/DeptPicker";
import AttendancePicker from './AttendancePicker';
export default {
  name: "editdialog",
  components: {
    DeptPicker,
    AttendancePicker
  },
  props: {
    dialog: {
      visible: Boolean
    }
  },
  methods: {
    cancelSubmit () {
      this.$refs.deptpicker.deptSelect = "总公司";
      this.$refs.rankpiceker.rankSelect = "默认班次";
    },
    onSubmit (formName) {
      const deptName = this.$refs.deptpicker.deptSelect;
      const rankName = this.$refs.rankpiceker.rankSelect;
      this.$emit("onSubmit", deptName, rankName);
    }
  }
};
</script>
