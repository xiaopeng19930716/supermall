<!--
 * @Descripttion:跟新密码对话框 
 * @version: 
 * @Author: 肖鹏
 * @Date: 2020-04-21 21:06:19
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-21 23:56:17
 -->
<template>
  <el-dialog title="更新密码" :visible.sync="dialog.visible" width="30%" @closed="cancelSubmit">
    <el-form :model="form" ref="form" size="small" label-width="8rem">
      <el-form-item v-for="(item, index) in formItems" :key="index" :label="item.label">
        <el-input
          v-model="item.value"
          :placeholder="item.placeholder"
          type="password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="cancelSubmit">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import http from "network/localaxios.js";
export default {
  name: "SysPwdUpdate",
  props: {
    dialog: {
      visible: Boolean
    }
  },
  data() {
    return {
      form: {},
      formItems: [
        {
          id: "oldPwd",
          label: "原密码",
          placeholder: "请输入原密码",
          value: ""
        },
        {
          id: "newPwd",
          label: "新密码",
          placeholder: "请输入新密码",
          value: ""
        }
      ]
    };
  },
  computed: {},
  created() {},
  methods: {
    cancelSubmit() {
      this.formItems.forEach(e => {
        e.value = "";
      });
      this.dialog.visible = false;
    },

    onSubmit() {
      let formData = {};
      this.formItems.forEach(e => {
        formData[e.id] = e.value;
      });
      http("/users/updatepwd", formData).then(res => {
        if (res.stateCode == 2) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.dialog.visible = false;
        } else if (res.stateCode == 1) {
          this.$message({
            message: "原密码错误",
            type: "error"
          });
        } else if (!res.status) {
          this.$message({
            message: "你还未登录系统 请先登录！",
            type: "warning"
          });
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped></style>
