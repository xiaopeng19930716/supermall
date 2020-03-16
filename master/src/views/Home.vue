<!--
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2019-09-19 22:06:10
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-13 21:49:13
 -->
<template>
  <!-- 主页 -->
  <el-container class="home">
    <el-aside width="210px">
      <Sidebar style="height:100vh"></Sidebar>
    </el-aside>
    <el-container>
      <el-header class="pageheader">
        <!-- 顶栏 -->
        <el-menu
          mode="horizontal"
          background-color="#54585d"
          default-active="activeIndex"
          text-color="white"
          active-text-color="yellow"
          :router="true"
          :unique-opened="true"
          style="float:right"
        >
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>系统</span>
            </template>
            <el-menu-item index="5-1" route="/home/arrangeset">考勤设置</el-menu-item>
            <el-menu-item index="5-2" route="/home/manager">管理员</el-menu-item>
            <el-menu-item @click="exit">退出</el-menu-item>
          </el-submenu>
        </el-menu>
        <!-- <el-page-header @back="goBack" content="详情页面"></el-page-header> -->
      </el-header>
      <el-main>
        <Breadcrumb></Breadcrumb>
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
import { Breadcrumb } from "components/index";
export default {
  name: "home",
  components: {
    Sidebar,
    Breadcrumb
  },
  methods: {
    exit() {
      sessionStorage.clear();
      this.$router.push("/");
    }
  }
};
</script>
<style lang="stylus" scoped>
.home {
  background: #e3e3e3;
}
</style>