<!--
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2019-09-20 01:56:31
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-11 04:28:41
 -->
<template>
  <!-- 侧边栏 -->
  <el-menu
    background-color="#323337"
    default-active="activeIndex"
    text-color="white"
    active-text-color="yellow"
    :router="true"
    :unique-opened="true"
    class="navbar"
  >
    <el-menu-item index="0" route="/home">
      <template slot="title">
        <i class="el-icon-s-home"></i>
        <span>首页</span>
      </template>
    </el-menu-item>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-user-solid"></i>
        <span>人事管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-1" route="/home/dept">部门</el-menu-item>
        <el-menu-item index="1-2" route="/home/user">人员</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>设备管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="2-1" route="/home/dev">设备信息</el-menu-item>
        <el-menu-item index="2-2" route="/home/devreal">实时数据</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-coordinate"></i>
        <span>排班管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="3-1" route="/home/quantum">时间段</el-menu-item>
        <el-menu-item index="3-2" route="/home/atten">班次</el-menu-item>
        <el-menu-item index="3-3" route="/home/schedul">人员排班</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-s-data"></i>
        <span>统计报表</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="4-1" route="/home/record">考勤记录</el-menu-item>
        <el-menu-item index="4-2" route="/home/report">报表统计</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>系统设置</span>
      </template>
      <el-menu-item index="5-1" route="/home/arrangeset">考勤设置</el-menu-item>
      <el-menu-item index="5-2" route="/home/manager">管理员</el-menu-item>
      <el-menu-item @click="exit">退出</el-menu-item>
    </el-submenu>
    <slot></slot>
  </el-menu>
</template>
<script>
export default {
  name: "sidebar",
  methods: {
    exit() {
      sessionStorage.clear();
      this.$router.push("/");
    }
  }
};
</script>
<style lang="stylus" scoped>
.navbar {
  margin: 0;
  padding: 0;
}
</style>