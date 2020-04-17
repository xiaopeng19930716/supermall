<template>
  <!-- 首页 -->
  <div class="panel">
    <div>
      <el-row :gutter="2">
        <el-col :span="12">
          <el-card :body-style="{ padding: '1rem',height:'20vh'}">
            <ButtonGroup></ButtonGroup>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card :body-style="{ padding: '1rem',height:'20vh'}">
            <iframe
              allowtransparency="true"
              frameborder="0"
              width="385"
              height="96"
              scrolling="no"
              src="//tianqi.2345.com/plugin/widget/index.htm?s=1&z=1&t=0&v=0&d=3&bd=0&k=&f=&ltf=009944&htf=cc0000&q=1&e=1&a=1&c=54511&w=385&h=96&align=center"
            ></iframe>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="2">
        <el-col :span="12">
          <el-card :body-style="{ padding: '1rem',height:'55vh'}">
            <div ref="atten" class="chart"></div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card :body-style="{ padding: '1rem',height:'55vh'}">
            <div ref="user" class="chart"></div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import ButtonGroup from "container/overview/ButtonGroup";
export default {
  components: {
    ButtonGroup
  },
  mounted() {
    const lineOption = {
      title: {
        text: "系统使用人数",
        left: "center",
        align: "right"
      },
      tooltip: {},
      color: ["#5f72bd"],
      xAxis: {
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
      yAxis: {},
      series: [
        {
          type: "line",
          smooth: true,
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#00f2fe" // 0% 处的颜色
                },

                {
                  offset: 1,
                  color: "#4facfe" // 100% 处的颜色
                }
              ]
            }
          },
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    };
    this.drawChart(this.$refs["user"], lineOption);
    const echart = require("echarts");
    const pieOption = {
      title: {
        text: "教师考勤情况",
        left: "center",
        align: "right"
      },
      tooltip: {
        formatter: "{b}:{c} ({d}%)"
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
          label: {
            normal: {
              show: true,
              position: "outer",
              formatter: "{d}%",
              textStyle: {
                fontSize: "14",
                fontWeight: "bolder"
              }
            }
          },
          data: [
            {
              value: 35,
              name: "迟到",
              itemStyle: {
                normal: {
                  //颜色渐变
                  color: new echart.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#868f96" },
                    { offset: 1, color: "#596164" }
                  ])
                }
              }
            },
            {
              value: 30,
              name: "旷工",
              itemStyle: {
                normal: {
                  //颜色渐变
                  color: new echart.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#09203f" },
                    { offset: 1, color: "#537895" }
                  ])
                }
              }
            },
            {
              value: 20,
              name: "请假",
              itemStyle: {
                normal: {
                  //颜色渐变
                  color: new echart.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#f9d423" },
                    { offset: 1, color: "#ff4e50" }
                  ])
                }
              }
            },
            {
              value: 1000,
              name: "实到",
              itemStyle: {
                normal: {
                  //颜色渐变
                  color: new echart.graphic.LinearGradient(0, 0, 1, 1, [
                    { offset: 0, color: "#00c6fb" },
                    { offset: 1, color: "#005be2" }
                  ])
                }
              }
            },
            {
              value: 15,
              name: "出差",
              itemStyle: {
                normal: {
                  //颜色渐变
                  color: new echart.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#c47ef5" },
                    { offset: 1, color: "#fa7ecd" }
                  ])
                }
              }
            }
          ]
        }
      ]
    };
    this.drawChart(this.$refs["atten"], pieOption);
  },
  methods: {
    drawChart(container, options) {
      let myChart = this.$echarts.init(container);
      myChart.setOption(options);
    }
  }
};
</script>

<style lang="stylus" scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>