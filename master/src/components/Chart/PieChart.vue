<!--
 * @Descripttion: 饼状图
 * @version: 
 * @Author: 肖鹏
 * @Date: 2020-04-12 21:59:00
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-15 20:34:08
 -->
<template>
  <div :id="echarts" :ref="echarts"></div>
</template>

<script>
import echarts from "echarts";
export default {
  props: {
    // 接收父组件传递过来的信息
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
    // 随机生成id
    echarts() {
      return "echarts" + Math.random() * 100000;
    },
    // 基本配置
    config() {
      return Object.assign(
        {
          title: "数据类型",
          radius: ["0%", "100%"],
          color: ["#8278e9", "#fc7293", "#ffc637", "#e7bcf2", "#ff8462"],
          showLabel: true,
          labelFormat: "{b}({d}%)"
        },
        this.chartConfig
      );
    }
  },
  mounted() {
    const that = this;
    that.$nextTick(() => {
      console.log(that.chartConfig);
      that.drawChart();
    });
  },
  methods: {
    drawChart() {
      const that = this;
      let myChart = echarts.init(that.$refs[that.echarts]);
      let option = {
        tooltip: {
          formatter: "{b} : {c}<br/>({d}%)"
        },
        radius: that.config.radius,
        color: that.config.color,
        series: [
          {
            name: that.config.title,
            type: "pie",
            data: that.chartData,
            label: {
              normal: {
                show: that.config.showLabel,
                formatter: that.config.labelFormat,
                textStyle: {
                  fontSize: 12
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