<script lang="ts" setup>
import { ref, watch } from "vue"
import { type IGetTableData } from "@/api/table/types/table"
import { usePagination } from "@/hooks/usePagination"
import { useApplyProductStore } from "@/store/modules/applyProduct"
import LoadingTips from "@/components/LoadingTips/index.vue"
import Map from "./c-cpn/map.vue"

defineOptions({
  name: "ElementPlus"
})

const loading = ref<boolean>(false)
const { paginationData } = usePagination()

//#region 查
const tableData = ref<IGetTableData[]>([])
const originalData: any = ref([])
// 获取数据
const getTableData = async () => {
  loading.value = true
  try {
    const res: [] = (await useApplyProductStore().getData()) as []
    originalData.value = res as any[]
    console.log(res)
    paginationData.total = res.length
    // 前端做分页
    const start = (paginationData.currentPage - 1) * paginationData.pageSize
    const end = paginationData.currentPage * paginationData.pageSize
    tableData.value = res.slice(start, end)
  } catch (error) {
    tableData.value = []
  }
  loading.value = false
}

//#endregion

/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], getTableData, { immediate: true })

// 地图

const startName = ref("长沙转运中心")
const endName = ref("湖南信息学院")
const mapRef = ref(null) as any

const handleOpenMap = (item: any) => {
  console.log(item)
  startName.value = item.send_address || "长沙转运中心"
  endName.value = item.address || "湖南信息学院"

  console.log(startName, endName)

  console.log(mapRef.value)
  mapRef.value?.changeDialog()
  mapRef.value?.initMap()
}
</script>

<template>
  <LoadingTips ref="loadingTipsRef" />
  <Map ref="mapRef" :startName="startName" :endName="endName" />
  <div class="app-container">
    <el-timeline>
      <el-timeline-item
        :timestamp="`紧急度:${item.degree} 地址:${item.address}`"
        placement="top"
        v-for="item in originalData"
        :key="item.id"
      >
        <el-card>
          <div class="distribution-card">
            <div class="left">
              <h2>物资信息</h2>
              <p>配送ID：{{ item.id }}</p>
              <p>物资名称：{{ item.product_name }}</p>
              <p>需求数量：{{ item.num }}</p>
              <p>配送人手机号：{{ item.phone_number }}</p>
              <p>地址：{{ item.address }}</p>
              <p>创建时间：{{ item.create_time }}</p>
            </div>
            <div class="right">
              <img src="@/assets/imgs/配送.jpg" alt="" @click="handleOpenMap(item)" />
            </div>
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<style lang="scss" scoped>
.search-wrapper {
  margin-bottom: 20px;
  .title {
    font-size: 1.3rem;
    font-weight: 550;
  }
}

.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.pager-wrapper {
  display: flex;
  justify-content: flex-end;
}

.distribution-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  .left {
    width: 400px;
  }
  .right {
    width: 240px;
    height: 150px;
    background-color: red;
    img {
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
