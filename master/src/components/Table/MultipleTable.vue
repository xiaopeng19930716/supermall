<!--
 * @Descripttion: 多选表格
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-03-03 19:31:06
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-06-26 12:19:52
 -->

<template>
  <el-table
    :data="data"
    size="mini"
    ref="multipleTable"
    @selection-change="handleSelectionChange"
    :height="height"
    :border="border"
    :stripe="stripe"
    v-loading="isLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.8)"
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
      align="center"
    ></el-table-column>
    <slot name="end"></slot>
  </el-table>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "MultiTable",
  props: {
    header: Array,
    data: Array,
    stripe: { type: Boolean, default: false },
    border: { type: Boolean, default: false },
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
  computed: {
    ...mapState({
      emptyText: state => state.emptyMsg,
      isLoading: state => state.loading.isLoading
    })
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