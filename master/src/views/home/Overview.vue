<template>
  <!-- 首页 -->
  <el-row>
    <div>
      <el-row :gutter="2">
        <el-col :span="12">
          <el-card class="gird">
            <el-button size="mini" type="primary" @click="toUserinfo">新增员工</el-button>
            <el-button size="mini" type="primary" @click="toAtten">员工排班</el-button>
            <el-button size="mini" type="primary" @click="toReport">考勤报表</el-button>
            <el-button size="mini" type="primary" @click="toSetting">系统设置</el-button>
            <el-button size="mini" type="primary">
              <a
                href="https://www.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6"
                style="color:white"
              >实时疫情</a>
            </el-button>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
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
          <el-card>
            <div ref="atten" class="chart"></div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <div ref="user" class="chart"></div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </el-row>
</template>
<script>
export default {
  mounted() {
    const lineOption = {
      title: {
        text: "系统使用人数",
        left: "center",
        align: "right"
      },
      tooltip: {},
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
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    };
    this.drawChart(this.$refs["user"], lineOption);

    const pieOption = {
      title: {
        text: "今日考勤简报",
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
          data: [
            { value: 35, name: "迟到" },
            { value: 30, name: "旷工" },
            { value: 2, name: "请假" },
            { value: 1000, name: "实到" },
            { value: 15, name: "出差" }
          ]
        }
      ]
    };
    this.drawChart(this.$refs["atten"], pieOption);
  },
  methods: {
    toUserinfo() {
      this.$router.push("/home/user");
    },
    toAtten() {
      this.$router.push("/home/atten");
    },
    toReport() {
      this.$router.push("/home/report");
    },
    toSetting() {
      this.$router.push("/home/arrangeset");
    },
    drawChart(container, options) {
      let myChart = this.$echarts.init(container);
      myChart.setOption(options);
    }
  }
};
</script>

<style lang="stylus">
.gird {
  height: 138px;
}

.chart {
  height: 350px;
  margin: 0 auto;
}
</style>