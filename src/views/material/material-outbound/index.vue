<script lang="ts" setup>
import { reactive, ref, watch } from "vue"
import { type IGetTableData } from "@/api/table/types/table"
import { type FormInstance, ElMessage, ElMessageBox } from "element-plus"
import { Search, Refresh, CirclePlus, Delete, Download, RefreshRight } from "@element-plus/icons-vue"
import { usePagination } from "@/hooks/usePagination"
import { useOutStockListStore } from "@/store/modules/outStock"

defineOptions({
  name: "ElementPlus"
})

const loading = ref<boolean>(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

//#region 增
const dialogVisible = ref<boolean>(false)
const formRef = ref<FormInstance | null>(null)
const formData = reactive({
  pid: "",
  uid: "",
  num: "",
  address: ""
})
const handleCreate = () => {
  formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      if (currentUpdateId.value === undefined) {
        console.log(formData)

        const res = await useOutStockListStore().addOutStockList(formData)
        console.log(res)
        ElMessage.success("新增成功")
        dialogVisible.value = false
        getTableData()
      } else {
        const res = await useOutStockListStore().updateOutStockList({ id: currentUpdateId.value, ...formData })
        console.log(res)
        ElMessage.success("修改成功")
        dialogVisible.value = false
        getTableData()
      }
    } else {
      return false
    }
  })
}
const resetForm = () => {
  currentUpdateId.value = undefined
  formData.pid = ""
  formData.uid = ""
  formData.num = ""
  formData.address = ""
}
//#endregion

//#region 改
// 修改目标id
const currentUpdateId = ref<undefined | string>(undefined)
const handleUpdate = (row: any) => {
  currentUpdateId.value = row.id
  formData.pid = row.pid
  formData.uid = row.uid
  formData.num = row.num
  formData.address = row.address
  dialogVisible.value = true
}
//#endregion

//#region 查
const tableData = ref<IGetTableData[]>([])
const searchFormRef = ref<FormInstance | null>(null)
const searchData = reactive({
  id: ""
})
const originalData = ref([])
// 获取数据
const getTableData = async () => {
  loading.value = true
  try {
    const res: [] = (await useOutStockListStore().getList()) as []
    originalData.value = res
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

// 搜索
const handleSearch = async () => {
  if (paginationData.currentPage === 1) {
    const res: any = await useOutStockListStore().searchOutStockList(searchData.id)
    console.log(res)
    tableData.value = []
    tableData.value = [res]
    paginationData.total = 1
  }
  paginationData.currentPage = 1
}
// 重置搜索
const resetSearch = () => {
  searchFormRef.value?.resetFields()
  if (paginationData.currentPage === 1) {
    getTableData()
  }
  paginationData.currentPage = 1
}
// 手动刷新
const handleRefresh = () => {
  getTableData()
}
//#endregion

//#region 删
const deleteList: Set<string> = new Set()
let isDeleteAll = false
const handleDelete = (row: any) => {
  ElMessageBox.confirm(`正在删除用户：${row.name}，确认删除？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(async () => {
    console.log(row.id)
    const res = await useOutStockListStore().deleteOutStockList(row.id)
    console.log(res)
    ElMessage.success("删除成功")
    getTableData()
  })
}
// 全选
const handleChangeAll = () => {
  isDeleteAll = !isDeleteAll
  console.log("handleChangeAll")
  if (isDeleteAll) {
    deleteList.clear()
    originalData.value.forEach((item: any) => {
      deleteList.add(item.id)
    })
  } else {
    deleteList.clear()
  }
  console.log(deleteList)
}
// 多选
const handleSelectionChange = (event: any) => {
  console.log(event)
  deleteList.clear()
  event.forEach((item: any) => {
    deleteList.add(item.id)
  })
  console.log(deleteList)
}
// 批量删除
const batchDelete = () => {
  deleteList.forEach(async (item) => {
    const res = await useOutStockListStore().deleteOutStockList(item)
    console.log(res)
  })
  deleteList.clear()
  ElMessage.success("删除成功")
  getTableData()
}

//#endregion

/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], getTableData, { immediate: true })
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="name" label="出库单ID">
          <el-input v-model="searchData.id" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
          <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">
        <div>
          <el-button type="primary" :icon="CirclePlus" @click="dialogVisible = true">新增出库信息</el-button>
          <el-button type="danger" :icon="Delete" @click="batchDelete">批量删除</el-button>
        </div>
        <div>
          <el-tooltip content="下载">
            <el-button type="primary" :icon="Download" circle />
          </el-tooltip>
          <el-tooltip content="刷新表格">
            <el-button type="primary" :icon="RefreshRight" circle @click="handleRefresh" />
          </el-tooltip>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table :data="tableData" @selection-change="handleSelectionChange($event)" @select-all="handleChangeAll()">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column prop="id" label="出库ID" align="center" />
          <el-table-column prop="product.name" label="物品名" align="center" />
          <el-table-column prop="pid" label="物品ID" align="center" />
          <el-table-column prop="user_info.nickname" label="收货人姓名" align="center" />
          <el-table-column prop="uid" label="收货人ID" align="center" />
          <el-table-column prop="num" label="数量" align="center" />
          <el-table-column prop="address" label="收货地址" align="center" />
          <el-table-column prop="create_time" label="创建时间" align="center" />
          <el-table-column fixed="right" label="操作" width="150" align="center">
            <template #default="scope">
              <el-button type="primary" text bg size="small" @click="handleUpdate(scope.row)">修改</el-button>
              <el-button type="danger" text bg size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pager-wrapper">
        <el-pagination
          background
          :layout="paginationData.layout"
          :page-sizes="paginationData.pageSizes"
          :total="paginationData.total"
          :page-size="paginationData.pageSize"
          :currentPage="paginationData.currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    <!-- 新增/修改 -->
    <el-dialog
      v-model="dialogVisible"
      :title="currentUpdateId === undefined ? '新增物资' : '修改物资'"
      @close="resetForm"
      width="30%"
    >
      <el-form ref="formRef" :model="formData" label-width="100px" label-position="left">
        <el-form-item prop="pid" label="物品ID">
          <el-input v-model="formData.pid" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="uid" label="收货人ID">
          <el-input v-model="formData.uid" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="num" label="数量">
          <el-input v-model="formData.num" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="address" label="地址">
          <el-input v-model="formData.address" placeholder="请输入" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleCreate">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.search-wrapper {
  margin-bottom: 20px;
  :deep(.el-card__body) {
    padding-bottom: 2px;
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
</style>
