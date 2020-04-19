<!--
 * @Descripttion: 多选表格
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-03-03 19:31:06
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-19 19:35:18
 -->

<template>
  <el-table
    :data="data"
    size="mini"
    ref="multipleTable"
    @selection-change="handleSelectionChange"
    :height="height"
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
  name: "MultiTable",
  props: {
    header: Array,
    data: Array,
    height: {
      type: String,
      default: "70vh"
    }
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