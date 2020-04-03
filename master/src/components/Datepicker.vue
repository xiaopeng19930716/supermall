<!--
 * @Descripttion:日期选择器 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-03-13 01:37:37
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-04-01 10:55:34
 -->
<template>
  <div>
    <el-date-picker
      size="mini"
      v-model="date"
      type="daterange"
      range-separator="到"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="yyyy-MM-dd"
      @change="dateChange"
    ></el-date-picker>
  </div>
</template>

<script>
import { formatDate } from "assets/js/common/dateFormat";
export default {
  name: "DatePicker",
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
    end.setHours(0);
    end.setMinutes(0);
    end.setSeconds(0);
    this.date = [start, end];
    this.date[0] = formatDate(this.date[0]);
    this.date[1] = formatDate(this.date[1]);
  },
  methods: {
    dateChange() {
      const startTime = this.date[0];
      const endTime = this.date[1];
      this.$emit("dateChange", startTime, endTime);
    }
  }
};
</script>
