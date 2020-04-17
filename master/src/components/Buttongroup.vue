<!--
 * @Descripttion: 
 * @version: 
 * @Author: 肖鹏
 * @Date: 2020-04-06 17:43:31
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-17 16:18:48
 -->
<template>
  <!-- 按钮组 -->
  <el-button-group>
    <slot name="start"></slot>
    <el-button type="primary" size="mini" icon="el-icon-plus" @click="handleAdd">新增</el-button>
    <slot name="center"></slot>
    <el-button
      v-if="isFileIn"
      type="primary"
      size="mini"
      icon="el-icon-document"
      @click="handleFileIn"
    >导入</el-button>
    <el-button type="primary" size="mini" icon="el-icon-document" @click="handleFileOut">导出</el-button>
    <slot name="end"></slot>
  </el-button-group>
</template>
<script>
export default {
  name: "buttongroup",
  props: {
    isFileIn: {
      type: Boolean,
      default: true
    }
  },
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