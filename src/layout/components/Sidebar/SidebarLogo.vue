<script lang="ts" setup>
const props = defineProps({
  collapse: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <div class="sidebar-logo-container" :class="{ collapse: props.collapse }">
    <transition name="sidebar-logo-fade">
      <router-link v-if="props.collapse" key="collapse" to="/">
        <img src="@/assets/layout/logo.webp" class="sidebar-logo" />
      </router-link>
      <router-link v-else key="expand" to="/">
        <div class="sidebar-box">
          <span class="text">应急物资调度系统</span>
        </div>
      </router-link>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: var(--v3-header-height);
  line-height: var(--v3-header-height);
  background-color: var(--v3-sidebarlogo-bg-color);
  text-align: center;
  overflow: hidden;
  .sidebar-logo {
    display: none;
  }
  .sidebar-box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    .logo {
      height: 40px;
    }
    .text {
      color: #eee;
      font-size: 1.1rem;
      height: 1rem;
      line-height: 15px;
      font-family: "Courier New", Courier, monospace;
    }
  }
}

.collapse {
  .sidebar-logo {
    width: 32px;
    height: 32px;
    vertical-align: middle;
    display: inline-block;
  }
  .sidebar-logo-text {
    display: none;
  }
}
</style>
