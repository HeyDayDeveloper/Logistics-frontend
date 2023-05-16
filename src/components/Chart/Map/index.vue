//index.js
<template>
  <div id="main" class="map" ref="chinaMap" />
</template>

<script setup lang="ts">
import * as echarts from "echarts"
import chinaJSON from "@/assets/json/湖南.json"
import { onMounted, ref } from "vue"
const chinaMap = ref()
onMounted(() => {
  drawChina()
})
const regions = [
  {
    name: "常德市",
    itemStyle: {
      areaColor: "#374ba4",
      opacity: 1
    }
  },
  {
    name: "长沙市",
    itemStyle: {
      areaColor: "#fe9b45",
      opacity: 1
    }
  },
  {
    name: "衡阳市",
    itemStyle: {
      areaColor: "#fd691b",
      opacity: 1
    }
  },
  {
    name: "娄底市",
    itemStyle: {
      areaColor: "#ffc556",
      opacity: 1
    }
  }
]
const scatter = [
  { name: "长沙市", value: 163 },
  { name: "株洲市", value: 135 },
  { name: "湘潭市", value: 52 },
  { name: "常德市", value: 93 },
  { name: "郴州市", value: 52 },
  { name: "衡阳市", value: 13 },
  { name: "怀化市", value: 43 },
  { name: "娄底市", value: 6 },
  { name: "邵阳市", value: 43 },
  { name: "益阳市", value: 12 },
  { name: "永州市", value: 35 },
  { name: "岳阳市", value: 92 },
  { name: "张家界市", value: 36 },
  { name: "湘西土家族苗族自治州", value: 6 }
]
function drawChina() {
  const myChart = echarts.init(chinaMap.value)
  echarts.registerMap("china", chinaJSON as any) //注册可用的地图
  const option = {
    // 数值栏
    visualMap: {
      min: 0,
      max: 1000,
      left: 26,
      bottom: 40,
      showLabel: !0,
      textStyle: {
        align: "center",
        color: "#FDD56A"
      },
      pieces: [
        {
          gte: 100,
          label: "> 100 人",
          color: "#20B2AA"
        },
        {
          gte: 50,
          lte: 100,
          label: "50 - 100 人",
          color: "#40E0D0"
        },
        {
          gte: 10,
          lte: 50,
          label: "10 - 50 人",
          color: "#00FFFF	"
        },
        {
          gte: 1,
          lt: 10,
          label: "1 - 9 人",
          color: "#E0FFFF"
        }
      ],
      show: !0
    },
    // 提示
    tooltip: {
      triggerOn: "click",
      formatter: function (e, t, n) {
        return 0.5 == e.value ? e.name + "：捐赠物资" : e.seriesName + "<br />" + e.name + "：" + e.value
      }
    },
    // 标题
    title: {
      top: 20,
      text: "省内需求数据",
      subtext: "",
      x: "center",
      textStyle: {
        color: "#fff"
      }
    },
    geo: {
      map: "china",
      roam: false, //是否允许缩放，拖拽
      zoom: 4.3, //初始化大小

      //缩放大小限制
      scaleLimit: {
        min: 1, //最小
        max: 10 //最大
      },
      //设置中心点
      center: [111.600353, 27.705255],
      //省份文字
      label: {
        normal: {
          show: true,
          fontSize: "14",
          color: "#333"
        },
        emphasis: {
          //动态展示的样式
          color: "#010D39"
        }
      },
      //省份地图添加背景
      regions: regions,
      itemStyle: {
        areaColor: "#ffffff",
        // shadowColor: "#182f68",
        color: "red"
        // borderColor: "#232652",
        // borderWidth: 2
      },
      //高亮状态
      emphasis: {
        itemStyle: {
          areaColor: "#1af9e5",
          color: "#fff"
        }
      }
    },
    //配置属性
    series: {
      // type: "effectScatter",
      // coordinateSystem: "geo",
      // data: scatter, //scatter 高亮点
      // showEffectOn: "render",
      // rippleEffect: {
      //   //涟漪特效相关配置
      //   brushType: "stroke" //波纹的绘制方式，可选 'stroke' 和 'fill'
      // },

      name: "捐赠物资数",
      type: "map",
      geoIndex: 0,
      data: scatter,

      hoverAnimation: true, //是否开启鼠标 hover 的提示动画效果
      label: {
        //图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等，
        normal: {
          formatter: "{b}",
          position: "right",
          show: true
        }
      },
      itemStyle: {
        //图形样式，normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时
        normal: {
          color: "#ffffff", //散点的颜色
          shadowBlur: 10,
          shadowColor: 20,
          fontSize: "12px"
        }
      },
      zlevel: 1
    }
  }
  myChart.setOption(option)
}
</script>

<style>
.map {
  height: 100%;
  margin: auto;
}
</style>
