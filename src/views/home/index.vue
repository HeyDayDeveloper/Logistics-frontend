<template>
  <div class="app-container">
    <div class="left">
      <div class="info-box">
        <Info />
      </div>
      <div class="bnts">
        <router-link to="/material/material-logistics" class="bnt-box">
          <svg-icon name="物流信息" />
          <p>物流信息</p>
        </router-link>
        <router-link to="/material/material-info" class="bnt-box">
          <svg-icon name="物资库存" />
          <p>物资库存</p>
        </router-link>
        <router-link to="/material/material-inbound" class="bnt-box">
          <svg-icon name="物资入库" />
          <p>物资入库</p>
        </router-link>
        <router-link to="/material/material-outbound" class="bnt-box">
          <svg-icon name="物资发放" />
          <p>物资发放</p>
        </router-link>
      </div>
      <div class="loginInformation">
        <BarEchart />
      </div>
    </div>
    <div class="right">
      <div class="map">
        <Map />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Info from "@/components/Info/index.vue"
import Map from "@/components/Chart/Map/index.vue"
import BarEchart from "@/components/Chart/BarEchart/index.vue"
</script>

<style lang="scss" scoped>
.app-container {
  color: #eee;
  background-color: #eee;
  display: flex;
  height: 100%;
  padding: 1rem;
  .left {
    width: 55%;
    display: flex;
    flex-direction: column;
    /* 信息栏 */
    .info-box {
      border-radius: 5px;
      height: 13rem;
      background-color: #0e2147;
      margin: 0.5rem 1rem;
    }
    /* 按钮栏 */
    .bnts {
      border-radius: 5px;
      height: 13rem;
      margin: 0.5rem 1rem;
      background-color: #0e2147;
      display: flex;
      align-items: center;
      justify-content: space-around;

      .bnt-box {
        padding-top: 1rem;
        cursor: pointer;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 20%;
        height: 90%;
        font-size: 1.04em;
        .svg-icon {
          min-width: 1em;
          font-size: 7.5rem;
        }
      }
      .bnt-box:hover {
        background-color: #162d5b;
      }
    }

    /* 统计栏 */
    .loginInformation {
      border-radius: 5px;
      flex: 1;
      margin: 0.5rem 1rem;
      background-color: #0e2147;
    }
  }
  .right {
    height: 100%;
    width: 45%;
    padding: 0.5rem 1rem;
    .map {
      border-radius: 5px;
      background-color: #0e2147;
    }
  }
}
</style>
