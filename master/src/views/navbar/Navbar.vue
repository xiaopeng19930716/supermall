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
    <el-menu-item index="0" route="/">Brand</el-menu-item>
    <el-submenu index="1" style="float:right">
      <template slot="title">系统设置</template>
      <el-menu-item index="1-1" route="/arrangeset">考勤设置</el-menu-item>
      <!-- <el-menu-item index="1-2">选项2</el-menu-item>
      <el-menu-item index="1-3">选项3</el-menu-item> -->
    </el-submenu>
    <el-menu-item index="2" style="float:right">工作平台</el-menu-item>
  </el-menu>
</template>

<script>
export default {
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