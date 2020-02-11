<template>
  <!-- 表格 -->
  <div>
    <el-table
      :data="data"
      border
      height="70vh"
      size="mini"
      row-key="id"
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column
        v-for="col in header"
        :prop="col.id"
        :key="col.id"
        :label="col.label"
        :width="col.width"
      ></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import tree from "assets/js/common/tree";
export default {
  name: "datable",
  // props: {
  //   data: { type: Array, required: true },
  //   header: { type: Array, required: true }
  // },
  data() {
    return {
      loading: false,
      header: [
        { id: "id", label: "部门编号" },
        { id: "deptname", label: "部门名称", width: "250" },
        { id: "pid", label: "上级部门" },
        { id: "deptow", label: "部门负责人" }
      ]
    };
  },
  computed: {
    ...mapState({ data: state => state.dept.data })
  },
  created() {
    this.getAllDept();
  },
  methods: {
    ...mapActions(["getAllDept"]),
  }
};
</script>