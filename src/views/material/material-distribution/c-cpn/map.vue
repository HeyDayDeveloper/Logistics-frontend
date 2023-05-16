<script lang="ts" setup>
import { ref } from "vue"
import AMapLoader from "@amap/amap-jsapi-loader"

const props = defineProps(["startName", "endName"])

console.log(props)

//进行地图初始化
function initMap() {
  AMapLoader.load({
    key: "e87381be9d8b3e349549a411470a7624", // 申请好的Web端开发者Key，首次调用 load 时必填
    plugins: ["AMap.AutoComplete", "AMap.PlaceSearch", "AMap.Driving", "AMap.DragRoute"],
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    Loca: {
      version: "2.0.0"
    }
  })
    .then((AMap) => {
      const map = new AMap.Map("container", {
        //设置地图容器id
        plugins: ["AMap.AutoComplete", "AMap.PlaceSearch", "AMap.Driving", "AMap.DragRoute"],
        center: [113.08982, 28.32427], //地图中心点
        zoom: 10 //地图显示的缩放级别
      })

      const goView = () => {
        // eslint-disable-next-line no-undef
        const driving = new AMap.Driving({
          map: map,
          // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
          policy: AMap.DrivingPolicy.LEAST_TIME,
          // panel 指定将结构化的路线详情数据显示的对应的DOM上，传入值需是DOM的ID
          panel: "panel"
        })
        // 根据起终点经纬度规划驾车导航路线
        driving.search(
          [
            { keyword: props.startName, city: "长沙" },
            { keyword: props.endName, city: "长沙" }
          ],
          function (status: any, result: any) {
            // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
            if (status === "complete") {
              console.log("绘制驾车路线完成", result)
            } else {
              console.log("获取驾车数据失败：" + result)
            }
          }
        )
      }
      goView() // 获取线路规划
    })
    .catch((e) => {
      console.log(e)
    })
}

initMap()

const dialogTableVisible = ref(false)

const changeDialog = () => {
  dialogTableVisible.value = !dialogTableVisible.value
}

//暴露方法
defineExpose({
  changeDialog,
  initMap
})
</script>

<template>
  <el-dialog v-model="dialogTableVisible" title="配送路径" width="1000px">
    <div class="map">
      <div id="container" />
      <div id="panel" />
    </div>
  </el-dialog>
</template>

<style scoped lang="scss">
.map {
  width: 100%;
  height: 600px;
  background-color: #fff;
  position: relative;
  #container {
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 100%;
  }
  #panel {
    position: absolute;
    top: 0;
    width: 300px;
    height: 400px;
    overflow-y: scroll;
    opacity: 0.8;
    border-radius: 4px;
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
  }
}
</style>
