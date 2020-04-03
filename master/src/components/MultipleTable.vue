<!--
 * @Descripttion: 多选表格
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-03-03 19:31:06
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-04-01 10:57:13
 -->

<template>
  <el-table
    :data="data"
    size="mini"
    ref="multipleTable"
    @selection-change="handleSelectionChange"
    height="70vh"
    border
    class="multitable"
  >
    <el-table-column type="selection" width="35"></el-table-column>
    <el-table-column
      v-for="col in header"
      :prop="col.id"
      :key="col.id"
      :label="col.label"
      :width="col.width"
      :fixed="col.fixed"
    ></el-table-column>
    <slot name="end"></slot>
  </el-table>
</template>
<script>
export default {
  props: {
    header: Array,
    data: Array
  },
  data() {
    return {
      multipleSelection: []
    };
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>
<style lang="stylus" scoped>
.multitable {
  margin-top: 2px;
}
</style>