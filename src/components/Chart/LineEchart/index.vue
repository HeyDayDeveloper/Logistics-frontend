<script setup lang="ts">
import BaseEchart from "../BaseEchart/index.vue"
import { ref } from "vue"

const myColor = ["#d0570e", "#d0a00e", "#34da62", "#00e9db", "#00c0e9", "#0096f3", "#33CCFF", "#33FFCC"]

const option = ref({
  backgroundColor: "#0e2147",
  title: {
    text: "采购物流信息",
    textStyle: {
      align: "center",
      color: "#fff",
      fontSize: 20
    },
    top: "3%",
    x: "center"
  },
  grid: {
    left: "10%",
    top: "12%",
    right: "3%",
    bottom: "8%",
    containLabel: true
  },
  xAxis: [
    {
      show: false
    }
  ],
  yAxis: [
    {
      axisTick: "none",
      axisLine: "none",
      offset: "27",
      axisLabel: {
        textStyle: {
          color: "#ffffff",
          fontSize: "16"
        }
      },
      data: [
        "杭州转运中心",
        "宁夏转运中心",
        "兰州转运中心",
        "南宁转运中心",
        "河南转运中心",
        "武汉转运中心",
        "合肥转运中心",
        "贵州转运中心"
      ]
    },
    {
      axisTick: "none",
      axisLine: "none",
      axisLabel: {
        textStyle: {
          color: "#ffffff",
          fontSize: "16"
        }
      },
      data: ["8", "7", "6", "5", "4", "3", "2", "1"]
    },
    {
      name: "分拨延误TOP 10",
      nameGap: "50",
      nameTextStyle: {
        color: "#ffffff",
        fontSize: "16"
      },
      axisLine: {
        lineStyle: {
          color: "rgba(0,0,0,0)"
        }
      },
      data: []
    }
  ],
  series: [
    {
      name: "条",
      type: "bar",
      yAxisIndex: 0,
      data: [25, 29, 38, 44, 50, 52, 60, 72],
      label: {
        normal: {
          show: true,
          position: "right",
          textStyle: {
            color: "#ffffff",
            fontSize: "16"
          }
        }
      },
      barWidth: 12,
      itemStyle: {
        normal: {
          color: function (params: any) {
            const num = myColor.length
            return myColor[params.dataIndex % num]
          }
        }
      },
      z: 2
    },
    {
      name: "白框",
      type: "bar",
      yAxisIndex: 1,
      barGap: "-100%",
      data: [99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5],
      barWidth: 20,
      itemStyle: {
        normal: {
          color: "#0e2147",
          barBorderRadius: 5
        }
      },
      z: 1
    },
    {
      name: "外框",
      type: "bar",
      yAxisIndex: 2,
      barGap: "-100%",
      data: [100, 100, 100, 100, 100, 100, 100, 100],
      barWidth: 24,
      itemStyle: {
        normal: {
          color: function (params: any) {
            const num = myColor.length
            return myColor[params.dataIndex % num]
          },
          barBorderRadius: 5
        }
      },
      z: 0
    },
    {
      name: "外圆",
      type: "scatter",
      hoverAnimation: false,
      data: [0, 0, 0, 0, 0, 0, 0, 0],
      yAxisIndex: 2,
      symbolSize: 35,
      itemStyle: {
        normal: {
          color: function (params: any) {
            const num = myColor.length
            return myColor[params.dataIndex % num]
          },
          opacity: 1
        }
      },
      z: 2
    }
  ]
})
</script>

<template>
  <div class="line-chart">
    <base-echart :option="option" width="100%" />
  </div>
</template>

<style scoped>
.line-chart {
  width: 100%;
}
</style>
