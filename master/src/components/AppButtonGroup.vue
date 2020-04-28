<!--
 * @Descripttion: 
 * @version: 
 * @Author: 肖鹏
 * @Date: 2020-04-06 17:43:31
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-28 18:49:40
 -->
<template>
  <!-- 按钮组 -->
  <el-button-group>
    <slot name="start"></slot>
    <el-button
      type="primary"
      size="mini"
      icon="el-icon-plus"
      @click="handleAdd"
    >新增</el-button>
    <slot name="center"></slot>
    <el-button
      v-if="isFileIn"
      type="primary"
      size="mini"
      icon="el-icon-document"
      @click="handleFileIn"
    >导入</el-button>
    <el-button
      type="primary"
      size="mini"
      icon="el-icon-document"
      @click="handleFileOut"
    >导出</el-button>
    <slot name="end"></slot>
  </el-button-group>
</template>
<script>
import BaseButtonGroup from './BaseButtonGroup'
export default {
  name: "buttongroup",
  components: {
    BaseButtonGroup
  },
  props: {
    isFileIn: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      buttons: [
        { type: "primary", size: "mini", icon: "el-icon-plus", text: "增加" },
        { type: "primary", size: "mini", icon: "el-icon-plus", text: "减少" },
        { type: "primary", size: "mini", icon: "el-icon-plus", text: "不增加" },
        { type: "primary", size: "mini", icon: "el-icon-plus", text: "不减少" }
      ]
    };
  },
  methods: {
    handleAdd () {
      this.$emit("handleAdd");
    },
    handleFileIn () {
      this.$emit("handleFileIn");
    },
    handleFileOut () {
      this.$emit("handleFileOut");
    }
  }
};
</script>