<!--
 * @Descripttion: 侧边栏
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2019-09-20 01:56:31
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-17 21:34:31
 -->
<template>
  <el-menu
    background-color="#f9f9f9"
    default-active="activeIndex"
    text-color="#303030"
    active-text-color="#73aadc"
    :router="true"
    :unique-opened="true"
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
        <el-menu-item index="2-1" route="/home/mobile">手机考勤</el-menu-item>
        <el-menu-item index="2-2" route="/home/dev">设备信息</el-menu-item>
        <el-menu-item index="2-3" route="/home/devreal">实时数据</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-s-check"></i>
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
        <el-menu-item index="4-2" route="/home/arrangeset">考勤设置</el-menu-item>
        <el-menu-item index="4-1" route="/home/record">考勤记录</el-menu-item>
        <el-menu-item index="4-3" route="/home/report">考勤报表</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-s-claim"></i>
        <span>日志</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="5-1" route="/home/devicelog">设备日志</el-menu-item>
        <el-menu-item index="5-2" route="/home/systemlog">系统日志</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="6">
      <template slot="title">
        <i class="el-icon-s-tools"></i>
        <span>系统</span>
      </template>
      <el-menu-item index="6-2" route="/home/manager">管理员</el-menu-item>
    </el-submenu>
  </el-menu>
</template>
<script>
export default {
  name: "Sidebar"
};
</script>