<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div class="grid-contenidmin-width: 800px">
          <div id="user"></div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-contenidmin-width: 800px">
          <div id="atten"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "hello",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  mounted() {
    this.drawLine();
    this.drawCicle();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("user"));
      // 绘制图表
      myChart.setOption({
        title: { text: "用户增减" },
        tooltip: {},
        xAxis: {
          type: "category",
          data: [
            "星期一",
            "星期二",
            "星期三",
            "星期四",
            "星期五",
            "星期六",
            "星期天"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line"
          }
        ]
      });
    },
    drawCicle() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("atten"));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: ["迟到", "旷工", "请假", "实到", "出差"]
        },
        series: [
          {
            name: "考勤明细",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: "迟到" },
              { value: 310, name: "旷工" },
              { value: 234, name: "请假" },
              { value: 1548, name: "实到" },
              { value: 155, name: "出差" }
            ]
          }
        ]
      });
    }
  }
};
</script>

<style lang="css">
#user,
#atten {
  width: 450px;
  height: 450px;
}
.el-row {
  min-width: 850px;
}
.el-col {
  border-radius: 4px;
  background: floralwhite;
}

.grid-content {
  margin: 0 auto;
  min-width: 400px;
  min-height: 400px;
}
</style>