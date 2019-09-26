<template>
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
      <el-menu-item index="1" style="float:right">系统设置</el-menu-item>
      <el-menu-item index="2" style="float:right">工作平台</el-menu-item>
    </el-menu>
</template>

<script>
export default {
   data() {
    return {
      activeIndex: "0",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
     
    }
  }
}
</script>