<template>
  <div>
    <el-select
      v-model="deptSelect"
      placeholder="请选择部门"
      size="mini"
      filterable
      @change="handleSelectChange"
    >
      <el-option
        v-for="item in deptInfo"
        :key="item.deptno"
        :label="item.label"
        :value="item.deptname"
      ></el-option>
    </el-select>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "DeptPicker",
  data() {
    return {
      deptSelect: "总公司"
    };
  },
  computed: {
    ...mapState({ deptInfo: state => state.dept.alldept })
  },
  created() {
    this.getAllDept();
  },
  methods: {
    ...mapActions(["getAllDept"]),
    handleSelectChange(val) {
      this.$emit("getByDept", val);
    }
  }
};
</script>