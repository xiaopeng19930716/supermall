<template>
  <!-- 顶部导航栏 -->
  <el-menu
    :default-active="activeIndex"
    mode="horizontal"
    @select="handleSelect"
    background-color="#323337"
    text-color="#fff"
    active-text-color="yellow"
    :router="true"
  >
    <el-menu-item index="0" route="/home">Brand</el-menu-item>
    <el-submenu index="1" style="float:right">
      <template slot="title">系统设置</template>
      <el-menu-item index="1-1" route="/home/arrangeset">考勤设置</el-menu-item>
      <el-menu-item index="1-2" route="/home/manager">管理员</el-menu-item>
      <el-menu-item index="1-3" route="/">退出</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {
      activeIndex: "0"
    };
  },
  methods: {
    handleSelect(key, keyPath) {}
  }
};
</script>