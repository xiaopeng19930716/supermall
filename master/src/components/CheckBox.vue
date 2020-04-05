<!--
 * @Descripttion: 日期选择器
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-03-02 20:34:52
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-04-01 10:55:21
 -->
<template>
  <div>
    <el-checkbox v-model="checkAll" @change="handleCheckAll" :indeterminate="isIndeterminate">全选</el-checkbox>
    <el-checkbox-group
      v-model="checkItem"
      class="flex flex-col"
      size="mini"
      @change="handleCheckChange"
    >
      <el-checkbox v-for="item in items" :key="item" :label="item">{{item}}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script>
export default {
  name: "CheckGroup",
  props: {
    items: Array,
    defaultChecked: Array
  },
  data() {
    return {
      checkAll: false,
      isIndeterminate: false,
      checkItem: []
    };
  },
  created() {
    this.checkItem = this.defaultChecked;
  },
  watch: {
    defaultChecked: function(val) {
      this.checkItem = val;
    }
  },
  methods: {
    handleCheckAll(val) {
      this.checkItem = val ? this.items : [];
      this.isIndeterminate = false;
    },
    handleCheckChange(val) {
      let count = val.length;
      this.checkAll = count === this.items.length;
      this.isIndeterminate = count > 0 && count < this.items.length;
    }
  }
};
</script>