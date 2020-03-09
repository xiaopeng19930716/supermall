<!--
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-03-03 19:49:31
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-10 01:22:40
 -->
<template>
  <el-select
    v-model="deptSelect"
    placeholder="请选择部门"
    size="mini"
    filterable
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