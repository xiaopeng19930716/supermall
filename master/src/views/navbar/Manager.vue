<template>
  <!-- 用户管理 -->
  <div>
    <el-table :data="table" size="mini" height="85vh" border style="text-align:center">
      <el-table-column prop="userno" label="编号"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column prop="date" label="建立日期"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">权限管理</el-button>
          <el-button size="mini" type="success" @click="addUser">添加用户</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加用户" :visible.sync="visable" center class="dialog">
      <el-form :model="form" :rules="rules" class="input" ref="ruleForm">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="用户名" auto-complete="false"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="登录密码" show-password auto-complete="false"></el-input>
        </el-form-item>
        <el-form-item prop="checkpwd">
          <el-input v-model="form.checkpwd" placeholder="确认密码" show-password auto-complete="false"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="resetForm('ruleForm')" class="button">重置</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')" class="button">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import http from "network/localaxios.js";
export default {
  data() {
    // 检查用户名称是否已经存在
    var checkName = (rule, value, callback) => {
      const arr = this.sysuser;
      if (arr.indexOf(value) === -1) {
        callback();
      } else {
        callback(new Error("用户名称已经存在"));
      }
    };
    // 核对两次输入密码是否一致
    var comfirmPwd = (rule, value, callback) => {
      if (this.form.password !== value) {
        callback(new Error("两次输入密码不一致！"));
      } else {
        callback();
      }
    };
    return {
      visable: false,
      table: [],
      sysuser: [],
      form: {
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
  mounted() {
    // 加载时显示数据库用户信息
    let url = "/users/querysys";
    http(url, {}, res => {
      this.table = res.data;
      for (const value of this.table) {
        this.sysuser.push(value.username);
      }
    });
  },
  methods: {
     addUser() {
      this.visable = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        // 通过验证后发送至后台
        if (valid) {
          let username = this.form.username;
          let password = this.form.password;
          let url = "/users/addsys";
          http(url, this.form, res => {
            // 后台写入成功或失败
            if (res.data.status == 1) {
              // 关闭对话框
              this.visable = false;
              // 列表添加当前记录
              this.table.push({
                username: this.form.username,
                password: this.form.password
              });
              count++;
              // 重置表单
              resetForm(formName);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="stylus">
.input {
  width: 90%;
  margin: 5px auto;
}

.button {
  width: 45%;
}
</style>