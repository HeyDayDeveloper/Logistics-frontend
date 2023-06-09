<template>
  <div ref="echartRef" :class="props.class" :style="{ width: props.width, height: props.height }" />
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue"
import * as echarts from "echarts"
import useResize from "@/utils/resize"
import type { Ref } from "vue"

interface IProps {
  option: echarts.EChartsCoreOption
  class?: string
  width?: string
  height?: string
}

const props = withDefaults(defineProps<IProps>(), { class: "base-echart", width: "100%", height: "400px" })

const echartRef = ref<HTMLElement | null>(null)
const echartInstance: Ref<echarts.ECharts | null> = ref(null)

onMounted(() => {
  initChart()
})

watch(
  () => props.option,
  () => {
    initChart()
  }
)

onBeforeUnmount(() => {
  if (!echartInstance.value) {
    return
  }
  echartInstance.value!.dispose()
  echartInstance.value = null
})

useResize(echartInstance)

const initChart = () => {
  echartInstance.value = echarts.init(echartRef.value!, "light", {
    renderer: "canvas"
  })
  echartInstance.value.setOption(props.option)
}
</script>

<style scoped></style>
