<script lang="ts" setup>
import Map from "@/components/Chart/Map/index.vue"
import LineChart from "@/components/Chart/LineEchart/index.vue"
import LineChart2 from "@/components/Chart/LineEchart2/index.vue"
import BarEchart from "@/components/Chart/BarEchart/index.vue"
import PieEchart from "@/components/Chart/PieEchart/index.vue"
</script>

<template>
  <div class="app-container">
    <div class="left">
      <div class="line card"><LineChart /></div>
      <div class="scatter card"><LineChart2 /></div>
    </div>
    <div class="middle"><Map /></div>
    <div class="right">
      <div class="pie card"><PieEchart /></div>
      <div class="bar card"><BarEchart /></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-container {
  width: 100%;
  height: 100%;
  display: flex;
  .card {
    margin: 1rem;
    flex: 1;
    background-color: #0e2147;
  }
  .left {
    width: 33%;
    display: flex;
    flex-direction: column;
  }
  .middle {
    width: 33%;
    margin: 1rem 0;
    background-color: #0e2147;
  }
  .right {
    width: 33%;
    display: flex;
    flex-direction: column;
  }
}
</style>
