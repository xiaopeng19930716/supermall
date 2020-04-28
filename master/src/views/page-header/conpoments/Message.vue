<!--
 * @Descripttion: 
 * @version: 
 * @Author: 肖鹏
 * @Date: 2020-04-28 17:42:59
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-28 17:55:42
 -->
<template>
  <el-popover
    placement="bottom"
    title="消息"
    width="150"
    trigger="hover"
  >
    <i
      class="el-icon-bell"
      slot="reference"
    ></i>
    <slot></slot>
  </el-popover>
</template>
<script>
export default {
  name: "Message",
  components: {},
  data () {
    return {

    };
  },
  computed: {},
  created () { },
  methods: {

  },
};
</script>

<style lang="stylus" scoped></style>
