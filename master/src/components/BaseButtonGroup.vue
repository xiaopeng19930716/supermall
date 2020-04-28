<!--
 * @Descripttion: 
 * @version: 
 * @Author: 肖鹏
 * @Date: 2020-04-28 18:20:10
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-28 18:50:09
 -->
<template>
  <el-button-group>
    <el-button
      v-for="(item, index) in buttons"
      :key="index"
      :type="item.type"
      :size="item.size"
      :icon="item.icon"
      @click="emitEvent(index)"
    >{{item.text}}</el-button>
  </el-button-group>
</template>

<script>
export default {
  name: "BaseButtonGroup",
  components: {},
  props: {
    buttons: {
      type: Array,
      default: () => [],
      required: true
    }
  },

  methods: {
    emitEvent (index) {
      this.$emit("onItemClick", index)
    }
  },
};
</script>
