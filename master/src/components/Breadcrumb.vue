<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item,key) of blist" :key="key">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  props: {
   blist:{
     type:Array,
     default:[]
   }
  }
};
</script>