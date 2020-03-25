<!--
 * @Descripttion: 顶部导航栏
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-03-25 11:35:45
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-25 12:49:03
 -->
<template>
  <el-menu
    mode="horizontal"
    background-color="#54585d"
    default-active="activeIndex"
    text-color="white"
    active-text-color="yellow"
    :unique-opened="true"
    style="float:right"
  >
    <el-menu-item index="8-1">
      <i class="el-icon-s-platform"></i>
      关于
    </el-menu-item>
    <el-menu-item index="8-2" @click="exit">
      退出
      <i class="el-icon-right"></i>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "PageHeader",
  methods: {
    exit() {
      sessionStorage.clear();
      this.$router.push("/");
    }
  }
};
</script>

<style lang="stylus" scoped></style>