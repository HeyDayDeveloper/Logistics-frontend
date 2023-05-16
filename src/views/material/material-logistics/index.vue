<script lang="ts" setup>
import { reactive, ref, watch } from "vue"
import { type IGetTableData } from "@/api/table/types/table"
import { type FormInstance, ElMessage, ElMessageBox } from "element-plus"
import { Search, Refresh, CirclePlus, Delete, Download, RefreshRight } from "@element-plus/icons-vue"
import { usePagination } from "@/hooks/usePagination"
import { useProductStore } from "@/store/modules/product"
import { useExpressStore } from "@/store/modules/express"

defineOptions({
  name: "ElementPlus"
})

const loading = ref<boolean>(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

//#region 增
const dialogVisible = ref<boolean>(false)
const formRef = ref<FormInstance | null>(null)
const formData = reactive({
  address: "",
  phone_number: "",
  product_name: "",
  user_name: "",
  status: 0
})

const handleCreate = () => {
  formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      if (currentUpdateId.value === undefined) {
        const res = await useExpressStore().addExpressList(formData)
        console.log(res)
        ElMessage.success("新增成功")
        dialogVisible.value = false
        getTableData()
      } else {
        console.log({ id: currentUpdateId.value, ...formData })
        const res = await useExpressStore().updateExpressList({ id: currentUpdateId.value, ...formData })
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
  formData.address = ""
  formData.phone_number = ""
  formData.product_name = ""
  formData.user_name = ""
  formData.status = 0
}
//#endregion

//#region 改
// 修改目标id
const currentUpdateId = ref<undefined | string>(undefined)
const handleUpdate = (row: any) => {
  currentUpdateId.value = row.id
  formData.address = row.address
  formData.phone_number = row.phone_number
  formData.product_name = row.product_name
  formData.user_name = row.user_name
  formData.status = row.status
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
    const res: [] = (await useExpressStore().getList()) as []
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
    const res: any = await useExpressStore().searchExpressList(searchData.id)
    console.log(res)
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
    const res = await useExpressStore().deleteExpressList(row.id)
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
    const res = await useExpressStore().deleteExpressList(item)
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
        <el-form-item prop="name" label="用户名">
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
          <el-button type="primary" :icon="CirclePlus" @click="dialogVisible = true">新增物流信息</el-button>
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
          <el-table-column prop="id" label="物流ID" align="center" />
          <el-table-column prop="product_name" label="物品名" align="center" />
          <el-table-column prop="user_name" label="收货人" align="center" />
          <el-table-column prop="address" label="地址" align="center" />
          <el-table-column prop="phone_number" label="手机号" align="center" />
          <el-table-column prop="status" label="状态" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.status === 1" type="success" effect="plain">已到达</el-tag>
              <el-tag v-else type="info" effect="plain">正在派送</el-tag>
            </template>
          </el-table-column>
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
      :title="currentUpdateId === undefined ? '新增物流信息' : '修改物流信息'"
      @close="resetForm"
      width="30%"
    >
      <el-form ref="formRef" :model="formData" label-width="100px" label-position="left">
        <el-form-item prop="name" label="物品名">
          <el-input v-model="formData.product_name" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="category" label="收货人">
          <el-input v-model="formData.user_name" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="num" label="地址">
          <el-input v-model="formData.address" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="unit" label="手机号">
          <el-input v-model="formData.phone_number" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="remark" label="状态">
          <el-input v-model="formData.status" placeholder="请输入" />
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
