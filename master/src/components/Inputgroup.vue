<!--
 * @Descripttion: 输入组
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2019-09-22 16:02:22
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-18 23:21:53
 -->
<template>
  <div style="display:flex;float:right">
    <slot></slot>
    <el-input :placeholder="placeholder" v-model="input" size="mini" style="width:18rem"></el-input>
    <el-button circle icon="el-icon-search" size="mini" type="primary" @click="handleSearch"></el-button>
  </div>
</template>

<script>
export default {
  name: "InputSearch",
  props: {
    defaultContext: String
  },
  data() {
    return {
      input: "",
      placeholder: "编号/名称"
    };
  },
  watch: {
    defaultContext: function changeInpt(newVal) {
      this.input = newVal;
    }
  },
  methods: {
    handleSearch() {
      this.$emit("getByName", this.input);
    }
  }
};
</script>
