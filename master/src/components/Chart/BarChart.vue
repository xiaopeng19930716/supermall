<!--
 * @Descripttion:折线图 
 * @version: 
 * @Author: 肖鹏
 * @Date: 2020-04-12 21:59:00
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-19 15:22:32
 -->
<template>
  <div :id="barChart" :ref="barChart"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "BarChart",
  props: {
    // 接收父组件传递过来的信息需要的参数X轴 x轴颜色 Y轴 y轴颜色 柱状图颜色 标题
    chartConfig: {
      type: Object,
      default: () => {}
    },
    chartData: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    barChart() {
      return "barChart" + Math.random() * 100000;
    },
    config() {
      return Object.assign(
        {
          title: "标题",
          xText: "#000",
          xColor: "#000",
          xAxisData: ["横轴1", "横轴2", "横轴3", "横轴4", "横轴5", "横轴6"],
          yText: "#000",
          yColor: "#000",
          yAxisData: [1, 2, 3, 4, 5],
          color: ["#8278e9", "#fc7293", "#ffc637", "#e7bcf2", "#ff8462"]
        },
        this.chartConfig
      );
    }
  },
  mounted() {
    const that = this;
    that.$nextTick(() => {
      that.drawChart();
    });
  },
  methods: {
    drawChart() {
      const that = this;
      let myChart = echarts.init(that.$refs[that.barChart]);
      let option = {
        tooltip: {},
        grid: {
          top: "20%",
          left: "0%",
          right: "5%",
          bottom: "2%",
          containLabel: true
        },
        title: {
          left: "center",
          text: that.chartConfig.title,
          textStyle: {
            fontWeight: "normal",
            color: "#fff",
            fontSize: 16
          }
        },
        xAxis: {
          type: "category",
          data: that.chartData.xAxisData,
          // 白色标签和白色轴线
          axisLine: {
            lineStyle: {
              color: that.chartConfig.xColor,
              width: 1
            }
          },
          axisLabel: {
            textStyle: {
              color: that.chartConfig.xText
            }
          }
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: that.chartConfig.yColor,
              width: 1
            }
          },
          axisLabel: {
            textStyle: {
              color: that.chartConfig.yText
            }
          }
        },
        series: [
          {
            data: that.chartData,
            type: "bar",
            itemStyle: {
              normal: {
                color: function(params) {
                  const colorList = that.chartConfig.color;
                  return colorList[params.dataIndex];
                }
              }
            }
          }
        ]
      };
      // 清除画布
      myChart.clear();
      myChart.setOption(option);
      // 在渲染点击事件之前先清除点击事件
      myChart.off("click");
    }
  }
};
</script>
