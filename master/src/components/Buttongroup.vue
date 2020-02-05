<template>
<!-- 按钮组 -->
  <el-button-group>
    <slot></slot>
  </el-button-group>
</template>
<script>

export default {
 data() {
   return {
     type:"primary",
     size:"mini",
   }
 },
}
</script>