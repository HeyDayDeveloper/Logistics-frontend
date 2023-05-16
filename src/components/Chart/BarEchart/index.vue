<script setup lang="ts">
import BaseEchart from "../BaseEchart/index.vue"
import { ref } from "vue"

const option = ref<echarts.EChartsCoreOption>({
  title: {
    text: "2023年捐赠数量和需求数量对比",
    textStyle: {
      align: "center",
      color: "#fff",
      fontSize: 20
    },
    left: "center",
    top: "3%"
  },
  grid: {
    top: "25%",
    bottom: "10%" //也可设置left和right设置距离来控制图表的大小
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
      label: {
        show: true
      }
    }
  },
  legend: {
    data: ["捐赠数量", "需求数量"],
    top: "15%",
    textStyle: {
      color: "#ffffff"
    }
  },
  xAxis: {
    data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月"],
    axisLine: {
      show: true, //隐藏X轴轴线
      lineStyle: {
        color: "#01FCE3"
      }
    },
    axisTick: {
      show: true //隐藏X轴刻度
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: "#ebf8ac" //X轴文字颜色
      }
    }
  },
  yAxis: [
    {
      type: "value",
      name: "万",
      nameTextStyle: {
        color: "#ebf8ac"
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: true
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#FFFFFF"
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#ebf8ac"
        }
      }
    },
    {
      type: "value",
      name: "万",
      nameTextStyle: {
        color: "#ebf8ac"
      },
      position: "right",
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        show: true,
        formatter: "{value} 万", //右侧Y轴文字显示
        textStyle: {
          color: "#ebf8ac"
        }
      }
    },
    {
      type: "value",
      gridIndex: 0,
      min: 50,
      max: 100,
      splitNumber: 8,
      splitLine: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ["rgba(250,250,250,0.0)", "rgba(250,250,250,0.05)"]
        }
      }
    }
  ],
  series: [
    {
      name: "捐赠数量",
      type: "line",
      yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
      smooth: true, //平滑曲线显示
      showAllSymbol: true, //显示所有图形。
      symbol: "circle", //标记的图形为实心圆
      symbolSize: 10, //标记的大小
      itemStyle: {
        //折线拐点标志的样式
        color: "#058cff"
      },
      lineStyle: {
        color: "#058cff"
      },
      areaStyle: {
        color: "rgba(5,140,255, 0.2)"
      },
      data: [4.0, 4.8, 2.4, 3.5, 3, 2.8, 3.9, 4.6]
    },
    {
      name: "需求数量",
      type: "bar",
      barWidth: 15,
      itemStyle: {
        normal: {
          color: "#4693EC"
        }
      },
      data: [3.2, 3.8, 4.1, 5, 3.5, 2.4, 3, 5]
    }
  ]
})
</script>

<template>
  <div class="line-chart">
    <base-echart :option="option" width="100%" height="100%" />
  </div>
</template>

<style scoped>
.line-chart {
  height: 100%;
}
</style>
