<template>
  <el-menu
    default-active="1"
    @open="handleOpen"
    @close="handleClose"
    background-color="#2f4554"
    text-color="white"
    active-text-color="yellow"
    :router="true"
    :unique-opened="true"
  >
    <el-submenu index="1">
      <template slot="title">
        <span>人事</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-1" route="/dept">部门</el-menu-item>
        <el-menu-item index="1-2" route="/user">人员</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <span>设备</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="2-1" route="/dev">设备信息</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <span>日志</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="3-1" route="/devlog">设备日志</el-menu-item>
        <el-menu-item index="3-2" route="/userlog">用户日志</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="4">
      <template slot="title">
        <span>报表</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="4-1" route="/atten">考勤记录</el-menu-item>
        <el-menu-item index="4-2" route="/rep">报表统计</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<style lang="css">
</style>
<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    }
  }
};
</script>