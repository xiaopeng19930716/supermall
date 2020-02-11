<template>
  <!-- 侧边栏 -->
  <el-menu
    @open="handleOpen"
    @close="handleClose"
    background-color="#323337"
    default-active="activeIndex"
    text-color="white"
    active-text-color="yellow"
    :router="true"
    :unique-opened="true"
    style="height:100vh"
  >
    <el-submenu index="1">
      <template slot="title">
        <span>人事</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-1" route="/home/dept">部门</el-menu-item>
        <el-menu-item index="1-2" route="/home/user">人员</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <span>设备</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="2-1" route="/home/dev">设备信息</el-menu-item>
        <el-menu-item index="2-2" route="/home/devreal">实时数据</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <span>排班</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="3-1" route="/home/quantum">时间段</el-menu-item>
        <el-menu-item index="3-2" route="/home/atten">班次</el-menu-item>
        <el-menu-item index="3-3" route="/home/schedul">人员排班</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <span>报表</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="4-1" route="/home/attendance">考勤记录</el-menu-item>
        <el-menu-item index="4-2" route="/home/report">报表统计</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<script>
export default {
  name: "sidebar",
  data() {
    return {
      activeIndex: "1"
    };
  },
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