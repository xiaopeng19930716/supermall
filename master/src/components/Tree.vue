<!--
 * @Descripttion: 树形插件
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-20 17:27:40
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-04-01 10:58:29
 -->

<template>
  <el-tree
    class="filter-tree"
    :data="data"
    :props="defaultProps"
    :default-expand-all="false"
    :filter-node-method="filterNode"
    ref="tree"
  ></el-tree>
</template>
<script>
export default {
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  },

  data() {
    return {
      filterText: "",
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  }
};
</script>
<style lang="stylus" scoped>
.tree {
  height: 100vh;
  // background: #e4e4e4;
}
</style>