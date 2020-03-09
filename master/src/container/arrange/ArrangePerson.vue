<!--
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-03-09 21:15:36
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-09 21:18:37
 -->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-03-04 16:42:05
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-08 17:54:40
 -->
<template>
  <!-- 动态生成的对话框对话框只有input-->
  <el-dialog title="人员排班" :visible.sync="dialog.visible" width="30%" @closed="cancelSubmit">
    <el-form label-width="80px">
      <el-form-item label="选择班次">
        <AttendancePicker ref="rankpiceker" defaultSelect="默认班次"></AttendancePicker>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { AttendancePicker } from "container/atten/index";
export default {
  name: "ArrangePerson",
  components: {
    AttendancePicker
  },
  props: {
    dialog: {
      visible: Boolean
    }
  },
  methods: {
    cancelSubmit() {
      this.$refs.rankpiceker.rankSelect = "默认班次";
    },
    onSubmit(formName) {
      const rankName = this.$refs.rankpiceker.rankSelect;
      this.$emit("onSubmit", rankName);
    }
  }
};
</script>
