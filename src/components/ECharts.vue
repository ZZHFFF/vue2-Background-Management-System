<template>
  <div ref="echart"></div>
</template>
<script>
import * as echarts from "echarts";
export default {
  props: {
    isAxisChart: {
      // 判断是柱状或折线true  还是饼状图
      type: Boolean,
      default: true,
    },
    chartData: {
      type: Object,
      default() {
        return {
          xData: [],
          series: [],
        };
      },
    },
  },
  watch: {
    // 监听,数据发生变化时，重新绘制
    chartData: {
      handler: function () {
        this.initChart();
      },
      // 首次也需监听
      deep: true,
    },
  },
  methods: {
    initChart() {
      this.initChartData();
      if (this.echart) {
        this.echart.setOption(this.options);
      } else {
        // 一开始一定先执行这个
        // 初始化  this.$refs.echart为DOM
        this.echart = echarts.init(this.$refs.echart);
        // 渲染
        this.echart.setOption(this.options);
      }
    },
    initChartData() {
      if (this.isAxisChart) {
        this.axisOption.xAxis.data = this.chartData.xData;
        this.axisOption.series = this.chartData.series;
      } else {
        this.normalOption.series = this.chartData.series;
      }
    },
  },
  data() {
    return {
      // 柱状或折线 配置基本一致，只需改横坐标的xAxis的data，以及series
      axisOption: {
        // 图例文字颜色
        textStyle: {
          color: "#333",
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: [],
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: [
          "#2ec7c9",
          "#b6a2de",
          "#5ab1ef",
          "#ffb980",
          "#d87a80",
          "#8d98b3",
        ],
        series: [],
      },
      // 饼状
      normalOption: {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [],
      },
      echart: null,
    };
  },
  computed: {
    options() {
      return this.isAxisChart ? this.axisOption : this.normalOption;
    },
  },
};
</script>
