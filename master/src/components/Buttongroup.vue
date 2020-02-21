<template>
  <!-- 按钮组 -->
  <el-button-group>
    <slot name="start"></slot>
    <el-button type="primary" size="mini" icon="el-icon-plus" @click="handleAdd">新增</el-button>
    <el-button type="primary" size="mini" icon="el-icon-document" @click="handleFileIn">导入</el-button>
    <el-button type="primary" size="mini" icon="el-icon-document" @click="handleFileOut">导出</el-button>
    <slot name="end"></slot>
  </el-button-group>
</template>
<script>
export default {
  name: "buttongroup",
  methods: {
    handleAdd() {
      this.$emit("handleAdd");
    },
    handleFileIn() {
      this.$emit("handleFileIn");
    },
    handleFileOut() {
      this.$emit("handleFileOut");
    }
  }
};
</script>