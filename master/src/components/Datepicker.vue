<template>
  <div style="display:inline">
    <el-date-picker
      @change="dateChange"
      v-model="value"
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
export default {
  data() {
    return {
      value: []
    };
  },
  mounted() {
    // 起始日期设置为当月1日
    let start = new Date();
    start.setDate(1);
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);
    let end = new Date();
    this.value = [start,end];
  },
  methods: {
    dateChange() {
      console.log(this.value);
      this.$emit("datePicked", this.value);
    }
  }
};
</script>