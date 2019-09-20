<template>
  <div id="app">
    <el-container>
      <el-header>
        <Navbar></Navbar>
      </el-header>

      <el-container>
        <el-aside>
          <Aside></Aside>
        </el-aside>

        <el-main>
          <Breadcrumb></Breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { Navbar, Aside ,Breadcrumb} from "views/index";
export default {
  name: "app",
   components: {
    Navbar,
    Aside,
    Breadcrumb
  }
};
</script>

<style>
@import "assets/css/base/normalize.css";
.el-container {
  height: 100vh;
}
.el-header {
  background-color: #323337;
}
.el-aside {
  background-color: #434348;
}
.el-main {
  background-color:#e9e9e9;
  padding: 1px;
}
</style>
