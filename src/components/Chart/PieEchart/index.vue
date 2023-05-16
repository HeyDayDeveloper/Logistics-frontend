<script setup lang="ts">
import BaseEchart from "../BaseEchart/index.vue"
import { ref } from "vue"
import DonateData from "@/assets/json/图表数据.json"

const colorList = ["#73DDFF", "#73ACFF", "#FDD56A", "#FDB36A", "#FD866A", "#9E87FF", "#58D5FF", "#cf0a03", "#338d46"]

const data = DonateData.data[0].data

const option = ref<echarts.EChartsCoreOption>({
  title: {
    text: "捐赠数各月份比较",
    x: "center",
    y: "center",
    textStyle: {
      align: "center",
      color: "#fff",
      fontSize: 14
    }
  },
  tooltip: {
    trigger: "item"
  },
  series: [
    {
      type: "pie",
      center: ["50%", "50%"],
      radius: ["30%", "55%"],
      clockwise: true,
      avoidLabelOverlap: true,
      hoverOffset: 15,
      itemStyle: {
        normal: {
          color: function (params) {
            return colorList[params.dataIndex]
          }
        }
      },
      label: {
        show: true,
        position: "outside",
        formatter: "{a|{b}：{d}%}\n{hr|}",
        rich: {
          hr: {
            backgroundColor: "t",
            borderRadius: 3,
            width: 2,
            height: 2,
            padding: [3, 3, 0, -12]
          },
          a: {
            padding: [-30, 15, -20, 15]
          }
        }
      },
      labelLine: {
        normal: {
          length: 20,
          length2: 30,
          lineStyle: {
            width: 1
          }
        }
      },
      data: data
    }
  ]
})
</script>

<template>
  <div class="line-chart">
    <base-echart :option="option" />
  </div>
</template>

<style scoped></style>
