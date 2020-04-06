<!--
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2019-09-19 22:06:10
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-04-05 20:16:44
 -->
<template>
  <!-- 主页 -->
  <el-container class="home">
    <el-aside width="210px">
      <Sidebar style="height:100vh"></Sidebar>
    </el-aside>
    <el-main class="main">
      <PageHeader></PageHeader>
      <Breadcrumb></Breadcrumb>
      <!-- Main content -->
      <transition name="bounce">
        <router-view></router-view>
      </transition>
    </el-main>
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
<style lang="stylus">
  .home {
    background: white;
  }

  .main {
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  .panel {
    padding: 4px;
    border-radius: 2px;
    background-color: #f2f2f2;
    box-shadow: 0 0 5px gray;
  }
</style>