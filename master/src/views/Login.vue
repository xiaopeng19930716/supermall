<template>
  <div>
    <el-form ref="loginForm" :model="loginForm" :rules="rules" class="login-box">
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item prop="username">
        <el-input type="text" placeholder="请输入账号" v-model="loginForm.username" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="loginForm.password" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click.native.prevent="login"
          style="width:100%;margin-top:10px"
        >登 录</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="温馨提示" :visible.sync="dialogVisible" width="35%">
      <span>账号名或密码错误</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import http from "../network/localaxios";
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        username: [
          { required: true, message: "账号不可为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不可为空", trigger: "blur" }]
      },
      // 对话框显示和隐藏
      dialogVisible: false
    };
  },
  methods: {
    login() {
      this.loading = true;
      const url = "/users/login";
      const params = this.loginForm;
      http(url, params, res => {
        if (res.data.length === 0) {
          this.dialogVisible = true;
        } else {
          this.$router.push("/home");
        }
      });
    }
  }
};
</script>

<style lang="stylus">
.login-box {
  min-height: 40vh;
  width: 350px;
  color: black;
  border: 1px solid #dcdfe6;
  margin: 20vh auto;
  padding: 25px;
  border-radius: 5px;
  box-shadow: 0 0 10px #909399;
  background: rgba(255, 255, 255, 1);
}

.login-title {
  font-size: 2rem;
  text-align: center;
  margin: 0 auto 35px auto;
  color: black;
}
</style>