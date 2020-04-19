<!--
 * @Descripttion: 日期时间选择器
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2019-09-28 20:12:55
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-04-01 10:55:47
 -->
<template>
  <!-- 日期选择器 -->
  <div style="display:inline">
    <el-date-picker
      @change="dateChange"
      v-model="date"
      ref="date"
      size="mini"
      type="datetimerange"
      :default-time="['00:00:01','23:59:59']"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    ></el-date-picker>
  </div>
</template>
<script>
import { formatDate } from "assets/js/common/dateFormat";
export default {
  data() {
    return {
      date: []
    };
  },
  created() {
    // 起始日期设置为当月1日
    let start = new Date();
    start.setDate(1);
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);
    let end = new Date();
    this.date = [start, end];
    this.date[0] = formatDate(this.date[0]);
    this.date[1] = formatDate(this.date[1]);
  },
  methods: {
    dateChange() {
      this.date[0] = formatDate(this.date[0]);
      this.date[1] = formatDate(this.date[1]);
      const startTime = this.date[0];
      const endTime = this.date[1];
      this.$emit("dateChange", startTime, endTime);
    }
  }
};
</script>