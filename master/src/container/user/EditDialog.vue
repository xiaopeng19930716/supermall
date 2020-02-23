<!--
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2019-09-22 17:41:01
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-02-15 09:32:59
 -->
<template>
  <el-dialog
    :dialog="dialog"
    :title="dialog.title"
    :visible.sync="dialog.visible"
    :width="dialog.width"
  >
    <el-form
      :model="user"
      :rules="rules"
      ref="adduser"
      size="small"
      label-width="80px"
      class="form"
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="user.name"></el-input>
      </el-form-item>
      <el-form-item label="部门">
        <el-select v-model="user.deptname">
          <el-option
            v-for="item in dept"
            :key="item.deptno"
            :label="item.deptname"
            :value="item.deptname"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="卡号">
        <el-input v-model="user.cardcode" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="user.sex">
          <el-radio label="男" border>男</el-radio>
          <el-radio label="女" border>女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="user.phone" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="user.email" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="user.identitycard" maxlength="20"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button type="primary" @click="cancelSubmit">取消</el-button>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "adddialog",
  props: {
    dialog: {
      title: String,
      width: String,
      visible: Boolean
    },
    user: Object
  },
  computed: {
    ...mapState({ dept: state => state.dept.alldept })
  },
  data() {
    return {
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { max: 20, message: "长度不超过20个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    cancelSubmit() {
      this.dialog.visible = false;
    },
    onSubmit() {
      this.$emit("onSubmit", this.user);
    }
  }
};
</script>
<style lang="stylus" scoped>
.form {
  width: 95%;
}
</style>