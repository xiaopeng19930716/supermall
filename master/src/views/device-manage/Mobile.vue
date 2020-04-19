<!--
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-03-31 17:40:52
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-18 22:50:10
 -->
<template>
  <div class="panel">
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

