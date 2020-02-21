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
    @close="resertForm"
  >
    <el-form :model="user" :rules="rules" ref="adduser" size="small" label-width="80px">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="user.name" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="部门">
        <el-input v-model="user.deptname" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="卡号">
        <el-input v-model="user.caedcode" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="user.sex" label="man" border>男</el-radio>
        <el-radio v-model="user.sex" label="women" border>女</el-radio>
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
      <el-button type="primary" @click="resertForm">重置</el-button>
      <el-button type="primary" @click="submitForm('adduser')">提交</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "adddialog",
  props: {
    dialog: {
      title: String,
      width: String,
      visible: Boolean
    }
  },
  data() {
    return {
      user: {
        name: "",
        sex: "man"
      }
    };
    rules: {
      username: [{ required: true, message: "名称必须填写", trigger: "blur" }];
    }
  },
  methods: {
    submitForm(formName) {},
    resertForm() {}
  }
};
</script>