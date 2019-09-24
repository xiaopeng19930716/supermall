<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-card>
          <div id="easy">
            <el-button type="primary">新增员工</el-button>
            <el-button type="primary">员工排班</el-button>
            <el-button type="primary">考勤报表</el-button>
            <el-button type="primary">系统设置</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <iframe
            allowtransparency="true"
            frameborder="0"
            width="140"
            height="203"
            scrolling="no"
            src="//tianqi.2345.com/plugin/widget/index.htm?s=2&z=1&t=1&v=1&d=2&bd=0&k=000000&f=&ltf=009944&htf=cc0000&q=1&e=1&a=1&c=54511&w=140&h=203&align=center"
          ></iframe>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-card>
          <div id="user"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div id="atten"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
WIDGET = { ID: "zjcgScM2gA" };
</script>
<script src="https://apip.weatherdt.com/view/static/js/r.js?v=1111"></script>
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
.el-card,
#user,
#atten {
  height: 290px;
  margin: 0 auto;
}
</style>