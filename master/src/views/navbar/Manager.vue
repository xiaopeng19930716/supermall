<template>
  <!-- 用户管理 -->
  <div>
    <el-table :data="userinfo" size="mini" height="85vh" border style="text-align:center">
      <el-table-column prop="accno" label="编号"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column prop="date" label="建立日期"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="warning" @click="handleEdit(scope.$index, scope.row)">权限管理</el-button>
          <el-button size="mini" type="danger" @click="addUser">添加用户</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加用户" :visible.sync="visable" width="35%">
      <el-form :model="form" label-width="80">
        <el-form-item label="用户名:">
          <el-input v-model="form.user" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="form.pwd" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click=" visable = false">取 消</el-button>
        <el-button type="primary" @click="onsubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visable: false,
      userinfo: [
        {
          accno: "1",
          username: "admin",
          password: "admin",
          date: "2020-1-1"
        }
      ],
      form: {
        user: "",
        pwd: ""
      }
    };
  },
  methods:{
    addUser(){
      this.visable = true;
    }
  }
};
</script>