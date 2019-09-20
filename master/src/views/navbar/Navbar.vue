<template>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#323337"
      text-color="#fff"
      active-text-color="white"
      style="padding:0"
      >
      <el-menu-item >企业图标</el-menu-item>
      <el-menu-item index="1" style="float:right">设置</el-menu-item>
      <el-menu-item index="2" style="float:right">工作平台</el-menu-item>
    </el-menu>
</template>

<script>
export default {
   data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>