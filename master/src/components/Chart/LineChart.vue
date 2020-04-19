<!--
 * @Descripttion:折线图 
 * @version: 
 * @Author: 肖鹏
 * @Date: 2020-04-12 21:59:00
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-15 11:55:42
 -->
<template>
  <div :id="lineChart" :ref="lineChart"></div>
</template>

<script>
  import echarts from "echarts";
  export default {
    name: "LineChart",
    props: {
      // 接收父组件传递过来的信息
      chartData: {}
    },
    computed: {
      lineChart() {
        return "lineChart" + Math.random() * 100000;
      },
      config() {
        return Object.assign(
          {
            xAxisData: ["横轴1", "横轴2", "横轴3", "横轴4", "横轴5", "横轴6"],
            yAxisData: [{ name: "名称", data: [1, 2, 3, 4, 5] }],
            color: ["#8278e9", "#fc7293", "#ffc637", "#e7bcf2", "#ff8462",],
            legendData: [],
            isSmooth: true,
            type: "line",
          },
          this.chartData
        );
      },
      series() {
        let series = this.config.yAxisData;
        series.map(element => {
          element.type = this.config.type;
          element.smooth = this.config.isSmooth;
        });
        return series
      }
    },
    mounted() {
      const that = this;
      that.$nextTick(() => {
        console.log(that.chartData);
        that.drawChart();
      });
    },
    methods: {
      drawChart() {
        const that = this;
        let myChart = echarts.init(that.$refs[that.lineChart]);
        let option = {
          color: that.config.color,
          grid: {
            top: "20%",
            left: "0%",
            right: "5%",
            bottom: "2%",
            containLabel: true
          },
          title: {
            left: "center",
            text: that.config.title,
            textStyle: {
              fontWeight: "normal",
              color: "#fff",
              fontSize: 16
            }
          },
          legend: {
            data: that.config.legendData,
            textStyle: {//图例文字的样式
              color: 'white',
              fontSize: 14
            },
            top: '10%'
          },
          tooltip: {
            trigger: "axis"
          },
          xAxis: {
            type: "category",
            data: that.config.xAxisData,
            axisLine: {
              lineStyle: {
                color: "#fff",
                width: 1
              }
            },
            axisLabel: {
              textStyle: {
                color: "#fff"
              }
            }
          },
          yAxis: {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#fff",
                width: 1
              }
            },
            axisLabel: {
              formatter: that.config.yFormat,
              textStyle: {
                color: "#fff"
              }
            }
          },
          series: that.series
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