<template>
<!-- 面包屑 -->
  <div>
    <el-dialog :visible.sync="visible">
      <slot></slot>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible
    };
  },
  methods: {}
};
</script>
