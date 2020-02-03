<template>
  <!-- 用户管理 -->
  <div>
    <el-table :data="sysuser" size="mini" height="85vh" border style="text-align:center">
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

    <el-dialog title="添加用户" :visible.sync="visable" width="45vw">
      <el-form :model="form" :rules="rules" class="input">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="用户名" auto-complete="false"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="密码" show-password auto-complete="false"></el-input>
        </el-form-item>
        <el-form-item prop="check">
          <el-input v-model="form.check" placeholder="确认密码" show-password auto-complete="false"></el-input>
        </el-form-item>
        <el-button type="primary" @click="newUser" class="button">确定并保存</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import http from "network/localaxios.js";
export default {
  data() {
    return {
      visable: false,
      sysuser: [],
      form: {
        username: "",
        password: "",
        check: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { max: 18, message: "不超过18个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { max: 64, message: "不超过18个字符", trigger: "blur" }
        ],
        check: [
          { required: true, message: "请确认密码", trigger: "blur" },
          { max: 64, message: "不超过18个字符", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    // 加载数据库用户列表
    let url = "/users/querysys";
    http(url, {}, (res) => {
      this.sysuser = res.data;
    });
  },
  methods: {
    addUser() {
      this.visable = true;
    },
    newUser() {
      let username = this.form.username;
      let password = this.form.password;
      let url = "/users/addsys";
      http(url, this.form, res => {
        console.log(res);
      });
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
  width: 100%;
}
</style>