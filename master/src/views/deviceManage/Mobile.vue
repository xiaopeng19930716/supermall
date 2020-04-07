<!--
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-03-31 17:40:52
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-31 18:25:18
 -->
<template>
  <div>
    <MultipleTable :data="tableData" :header="header"></MultipleTable>
  </div>
</template>

<script>
import { MultipleTable } from "components/index";
export default {
  name: "Mobile",
  components: { MultipleTable },
  data() {
    return {
      header: [{}]
    };
  },
  computed: {},
  created() {},
  methods: {}
};
</script>

<style lang="stylus" scoped></style>

