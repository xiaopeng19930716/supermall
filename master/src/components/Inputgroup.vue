<template>
  <div style="float:right">
    <el-input
      :placeholder="placeholder"
      v-model="input"
      maxlength="5"
      size="mini"
      style="width:10rem;outline:blue;border:lightblue"
    ></el-input>
    <el-button circle icon="el-icon-search" size="mini" type="primary"></el-button>
  </div>
</template>

