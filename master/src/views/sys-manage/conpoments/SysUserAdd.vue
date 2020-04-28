<!--
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-03-13 16:17:11
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-13 19:14:00
 -->
<template>
  <el-dialog
    :dialog="dialog"
    :visible.sync="dialog.visible"
    width="30%"
    title="增加管理员"
    @close="resetForm('ruleForm')"
  >
    <el-form :model="sysUser" :rules="rules" ref="ruleForm" label-width="80px" size="mini">
      <el-form-item prop="username" label="用户名">
        <el-input v-model="sysUser.username" auto-complete="false"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="登录密码">
        <el-input v-model="sysUser.password" show-password auto-complete="false"></el-input>
      </el-form-item>
      <el-form-item prop="checkpwd" label="确认密码">
        <el-input v-model="sysUser.checkpwd" show-password auto-complete="false"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "SysUserDialog",
  props: {
    dialog: {
      visible: Boolean
    }
  },
  data() {
    // 检查用户名称是否已经存在
    var checkName = (rule, value, callback) => {
      const arr = this.sysUserName;
      if (arr.indexOf(value) === -1) {
        callback();
      } else {
        callback(new Error("用户名称已经存在"));
      }
    };
    // 核对两次输入密码是否一致
    var comfirmPwd = (rule, value, callback) => {
      if (this.sysUser.password !== value) {
        callback(new Error("两次输入密码不一致！"));
      } else {
        callback();
      }
    };
    return {
      sysUser: {
        username: "",
        password: "",
        checkpwd: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { max: 18, message: "不超过18个字符", trigger: "blur" },
          { validator: checkName, trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { max: 64, message: "不超过64个字符", trigger: "blur" }
        ],
        checkpwd: [{ validator: comfirmPwd, trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapState({
      sysUserName: state => {
        const array = state.sysuser.data;
        const sysUserName = [];
        array.forEach(element => {
          sysUserName.push(element.username);
        });
        return sysUserName;
      }
    })
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        // 通过验证后发送至后台
        if (valid) {
          const username = this.sysUser.username;
          const password = this.sysUser.password;
          this.$emit("onSubmit", username, password);
        } else {
          return false;
        }
      });
    }
  }
};
</script>

