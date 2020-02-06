<template>
  <!-- 系统用户管理 -->
  <div class="panel">
    <Buttongroup>
      <el-button type="primary" size="mini" icon="el-icon-document" @click="fileout">导出</el-button>
      <el-button type="primary" size="mini" icon="el-icon-plus" @click="addUser">新增</el-button>
    </Buttongroup>
    <Inputgroup></Inputgroup>
    <el-table id="sysuser" :data="table" size="mini" height="70vh" border class="table">
      <el-table-column prop="userno" label="编号"></el-table-column>
      <el-table-column prop="username" label="管理员"></el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column prop="date" label="建立日期"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="privi(scope.$index, scope.row)">权限管理</el-button>
          <el-button size="mini" type="success" @click="delUser">删除用户</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加管理员" :visible.sync="visable" @close="resetForm('ruleForm')">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-position="right" label-width="80px">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="form.username"  auto-complete="false"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="登录密码">
          <el-input v-model="form.password"  show-password auto-complete="false"></el-input>
        </el-form-item>
        <el-form-item prop="checkpwd" label="确认密码">
          <el-input v-model="form.checkpwd"  show-password auto-complete="false"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import http from "network/localaxios.js";
import {leadout} from 'assets/js/common/filesaver.js';
import { Buttongroup, Inputgroup } from "components/index";
export default {
  components: {
    Buttongroup,
    Inputgroup
  },
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
    privi(){

    },
    fileout(){
      leadout("sysuser","系统用户")
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
              var date = new Date();
              date = date.toLocaleString();
              this.table.push({
                userno: this.$store.state.counter,
                username: this.form.username,
                password: this.form.password,
                date: date
              });
              this.$store.commit("increment");
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
    },
  }
};
</script>