<script lang="ts" setup>
import { ref } from "vue"

const centerDialogVisible = ref(false)

const openTips = () => {
  console.log("子组件方法")
  centerDialogVisible.value = true
  setTimeout(() => {
    closeTips()
  }, 3000)
}
const closeTips = () => {
  centerDialogVisible.value = false
}

defineExpose({ openTips, closeTips })
</script>

<template>
  <div class="app-container">
    <el-dialog
      v-model="centerDialogVisible"
      top="18%"
      width="30%"
      center
      :close-on-click-modal="false"
      :show-close="false"
    >
      <div class="dialog-box">
        <div class="img-box">
          <svg-icon name="database" />
          <svg-icon name="arrow-icn" />
          <svg-icon name="analysis" />
          <svg-icon name="arrow-icn" />
          <svg-icon name="stack" />
        </div>
        <p class="dialog-text">The best solution is being analyzed for you</p>
        <div class="balls">
          <div />
          <div />
          <div />
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button link @click="closeTips()" class="dialog-btn" size="large">Cancel</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.dialog-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  .img-box {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
    svg {
      margin: 0 5px;
      height: 2.6em;
      width: 2.6rem;
    }
  }
  .dialog-text {
    color: #333;
    text-align: center;
    font-size: 1.5em;
  }

  .balls {
    margin-top: 0.5rem;
    width: 4em;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
  }

  .balls div {
    width: 0.8em;
    height: 0.8em;
    border-radius: 50%;
    background-color: #999;
  }

  .balls div:nth-of-type(1) {
    transform: translateX(-100%);
    animation: left-swing 0.5s ease-in alternate infinite;
  }

  .balls div:nth-of-type(3) {
    transform: translateX(-95%);
    animation: right-swing 0.5s ease-out alternate infinite;
  }

  @keyframes left-swing {
    50%,
    100% {
      transform: translateX(95%);
    }
  }

  @keyframes right-swing {
    50% {
      transform: translateX(-95%);
    }
    100% {
      transform: translateX(100%);
    }
  }
}
</style>
