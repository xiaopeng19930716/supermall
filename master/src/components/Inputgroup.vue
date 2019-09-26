<template>
  <div style="float:right">
    <slot></slot>
    <el-input :placeholder="placeholder" v-model="input" size="mini" style="width:10rem"></el-input>
    <el-button circle icon="el-icon-search" size="mini" type="primary"></el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      placeholder: "编号/名称"
    };
  }
};
</script>
