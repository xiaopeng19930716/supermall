<template>
  <!-- 主页 -->
  <el-container class="home">
    <el-aside width="210px">
      <Sidebar style="height:100vh"></Sidebar>
    </el-aside>
    <el-container>
      <el-header class="pageheader">
        <el-page-header @back="goBack" content="详情页面"></el-page-header>
      </el-header>
      <el-main>
        <!-- Main content -->
        <transition name="bounce">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Sidebar from "views/aside/Sidebar";
import Tree from "components/Tree";
export default {
  name: "home",
  components: {
    Sidebar,
    Tree
  },
  methods: {
    goBack() {
      console.log("go back");
    }
  }
};
</script>
<style lang="stylus" scoped>
.home {
  background: #e3e3e3;
}
</style>