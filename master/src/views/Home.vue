<!--
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2019-09-19 22:06:10
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-25 11:52:10
 -->
<template>
  <!-- 主页 -->
  <el-container class="home">
    <el-aside width="210px">
      <Sidebar style="height:100vh"></Sidebar>
    </el-aside>
    <el-container>
      <el-header class="pageheader">
        <PageHeader></PageHeader>
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
import PageHeader from "views/pageheader/PageHeader";
import { Breadcrumb } from "components/index";
export default {
  name: "home",
  components: {
    Breadcrumb,
    Sidebar,
    PageHeader
  }
};
</script>
<style lang="stylus" scoped>
.home {
  background: #e3e3e3;
}
</style>