<!--
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-01-31 17:24:14
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-19 16:21:37
 -->
<template>
  <div class="login">
    <div class="bluearea"></div>
    <div class="info-form">
      <div style="padding:2vw;background:white">
        <el-form ref="loginForm" :model="loginForm" :rules="rules" class="login-box">
          <h3>欢迎登录</h3>
          <el-form-item prop="username">
            <el-input type="text" placeholder="请输入账号" v-model="loginForm.username" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              show-password
              placeholder="请输入密码"
              v-model="loginForm.password"
              @keydown.enter.native="login"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click.native.prevent="login"
              :class="[this.doShake? 'login-button-shake':'','login-button']"
            >登 录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="information">
        <h2>公司信息</h2>
        <p>Lorem ipsum iure doloribus nam assumenda nesciunt ratione harum! Officiis ipsa rem ab eveniet quo, repellat ratione tempora sint ad.</p>
        <i class="el-icon-phone">&nbsp;&nbsp;+86 155 2737 6176</i>
        <i class="el-icon-message">&nbsp;&nbsp;2293916963@qq.com</i>
      </div>
    </div>
  </div>
</template>

<script>
import http from "network/localaxios";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      doShake: false,
      rules: {
        username: [
          { required: true, message: "账号不可为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不可为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    login() {
      this.doShake = false;
      const url = "/users/login";
      const params = this.loginForm;
      http(url, params)
        .then(res => {
          if (!res.status) {
            this.$message({
              message: res.msg,
              type: "error"
            });
            this.doShake = true;
          } else {
            const message = "用户" + this.loginForm.username + "登陆成功！";
            this.$message({
              message: message,
              type: "success"
            });
            this.doShake = false;
            sessionStorage.setItem("token", res.token);
            this.$router.push("/home");
          }
        })
        .catch(err => {
          this.$message({
            message: "服务器连接出错请联系管理员！",
            type: "danger"
          });
          this.doShake = true;
        });
    }
  }
};
</script>

<style lang="stylus">
.login {
  width: 100vw;
  height: 100vh;
  background-color: #039be6;
  position: relative;
}

.bluearea {
  width: 50vw;
  height: 60vh;
  background-color: #ebeef5;
}

.info-form {
  position: absolute;
  top: 20vh;
  left: 30vw;
  box-shadow: 0 0 1rem black;
  height: 50vh;
  width: 36vw;
  display: flex;
}

.login-box {
  height: 100%;
  width: 16vw;
  background: yellow;
  color: black;
  background: white;
  text-align: center;
  position: relative;

  h3 {
    text-align: center;
    font-size: 2rem;
    margin: 0 auto 3.5rem auto;
    color: black;
    letter-spacing: 0.2rem;
  }
}

.information {
  height: 100%;
  background: #039be6;
  color: white;
  height: 46vh;
  width: 16vw;
  font-size: 1.6rem;

  h2 {
    text-align: center;
    margin: 2vw;
    font-size: 1.6rem;
  }

  p {
    text-indent: 2rem;
    padding-left: 2rem;
    padding-right: 2rem;
    text-align: justify;
  }

  i {
    margin-top: 2rem;
    text-indent: 2rem;
    font-size: 1.5rem;
  }
}

.login-button {
  width: 100%;
  margin-top: 3rem;
  position: absolute;
  left: 0;
  background-image: linear-gradient(#4481eb, #04bef0);
}

.login-button-shake {
  animation: button-shake 20ms ease-in-out 20;
}

@keyframes button-shake {
  0% {
    left: 0;
  }

  25% {
    left: 0.2rem;
  }

  50% {
    left: 0;
  }

  75% {
    left: -0.2rem;
  }

  100% {
    left: 0;
  }
}
</style>