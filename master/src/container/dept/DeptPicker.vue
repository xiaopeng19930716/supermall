<!--
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-03-03 19:49:31
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-05 19:31:00
 -->
<template>
  <div>
    <el-select
      v-model="deptSelect"
      placeholder="请选择部门"
      size="mini"
      filterable
      class="dept-picker"
      :disabled="isDisabled"
      @change="handleSelectChange"
    >
      <el-option
        v-for="item in deptData"
        :key="item.deptno"
        :label="item.deptname"
        :value="item.deptname"
      ></el-option>
    </el-select>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "DeptPicker",
  props: {
    isDisabled: {
      type: Boolean,
      default: false
    },
    defaultSelect: {
      type: String
    }
  },
  watch: {
    defaultSelect: function(val) {
      this.deptSelect = val;
    }
  },
  data() {
    return {
      deptSelect: "总公司"
    };
  },
  computed: {
    ...mapState({ deptData: state => state.dept.data })
  },
  created() {
    this.getAllDept();
  },
  methods: {
    ...mapActions(["getAllDept"]),
    handleSelectChange(val) {
      this.$emit("handleSelectChange", val);
    }
  }
};
</script>
<style lang="stylus" scoped>
.dept-picker {
  width: 300px;
}
</style>