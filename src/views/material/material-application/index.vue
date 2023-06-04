<script lang="ts" setup>
import { reactive, ref, watch } from "vue"
import { type IGetTableData } from "@/api/table/types/table"
import { type FormInstance, ElMessage, ElMessageBox } from "element-plus"
import { Search, Refresh, CirclePlus, Delete, Download, RefreshRight } from "@element-plus/icons-vue"
import { usePagination } from "@/hooks/usePagination"
import { useApplyProductStore } from "@/store/modules/applyProduct"
import { useUserStore } from "@/store/modules/user"
import { useProductStore } from "@/store/modules/product"
import LoadingTips from "@/components/LoadingTips/index.vue"

defineOptions({
  name: "ElementPlus"
})

const loading = ref<boolean>(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

//#region 增
const info: any = useUserStore().info
const loadingTipsRef = ref<InstanceType<typeof LoadingTips>>()
const dialogVisible = ref<boolean>(false)
const formRef = ref<FormInstance | null>(null)
const formData = reactive({
  uid: info.id,
  degree: Math.ceil(Math.random() * 5),
  product_name: "",
  address: "",
  num: ""
})
const handleCreate = () => {
  formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      if (currentUpdateId.value === undefined) {
        loadingTipsRef.value!.openTips()
        console.log(formData)
        setTimeout(async () => {
          const res = await useApplyProductStore().addData(formData)
          console.log(res)
          ElMessage.success("新增成功")
          dialogVisible.value = false
          getTableData()
        }, 3000)
      } else {
        console.log(validationData)
        const res = await useApplyProductStore().validationData(validationData)
        console.log(res)
        const res2 = await useApplyProductStore().deleteData(validationData.id)
        console.log(res2)
        options = []
        ElMessage.success("提交成功")
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
  formData.product_name = ""
  formData.address = ""
  formData.num = ""
}
//#endregion

//#region 审核
// 修改目标id
let options: any[] = []
const validationData = reactive({
  id: "",
  pid: ""
})
const useProduct = useProductStore()
const currentUpdateId = ref<undefined | string>(undefined)
const handleValidationData = async (row: any) => {
  // 处理选择项
  const res: any = await useProduct.getSearchData(row.product_name)
  const list: [] = res.data
  list.forEach((item: any) => {
    const obj = {
      id: null,
      name: null
    }
    obj.id = item.id
    obj.name = item.name
    options.push(obj)
  })
  console.log(options)
  validationData.id = row.id

  currentUpdateId.value = row.id
  formData.product_name = row.product_name
  formData.address = row.address
  formData.num = row.num
  dialogVisible.value = true
}
//#endregion

//#region 查
const tableData = ref<IGetTableData[]>([])
const originalData = ref([])
// 获取数据
const getTableData = async () => {
  loading.value = true
  try {
    const res: [] = (await useApplyProductStore().getData()) as []
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

// 手动刷新
const handleRefresh = () => {
  getTableData()
}

//#region 删
const deleteList: Set<string> = new Set()
let isDeleteAll = false
const handleDelete = (row: any) => {
  ElMessageBox.confirm(`正在删除用户：${row.product_name}，确认删除？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(async () => {
    console.log(row.id)
    const res = await useApplyProductStore().deleteData(row.id)
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
    const res = await useApplyProductStore().deleteData(item)
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
  <LoadingTips ref="loadingTipsRef" />
  <div class="app-container">
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <div class="title">物资申请</div>
    </el-card>
    <el-card v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">
        <div>
          <el-button type="primary" :icon="CirclePlus" @click="dialogVisible = true">新增申请信息</el-button>
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
          <el-table-column prop="id" label="申请表ID" align="center" />
          <el-table-column prop="uid" label="申请人ID" align="center" />
          <el-table-column prop="product_name" label="物品名称" align="center" />
          <el-table-column prop="phone_number" label="申请人手机号" align="center" />
          <el-table-column prop="degree" label="紧急度" align="center" width="120">
            <template #default="scope">
              <el-rate
                v-model="scope.row.degree"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value} points"
              />
            </template>
          </el-table-column>
          <el-table-column prop="num" label="数量" align="center" />
          <el-table-column prop="address" label="地址" align="center" />
          <el-table-column prop="create_time" label="创建时间" align="center" />
          <el-table-column fixed="right" label="操作" width="150" align="center">
            <template #default="scope">
              <el-button type="primary" text bg size="small" @click="handleValidationData(scope.row)">审核</el-button>
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
      :title="currentUpdateId === undefined ? '提交申请' : '通过申请'"
      @close="resetForm"
      width="30%"
    >
      <el-form ref="formRef" :model="formData" label-width="100px" label-position="left">
        <el-form-item prop="product_name" label="物资名" v-if="!currentUpdateId">
          <el-input v-model="formData.product_name" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="address" label="地址">
          <el-input v-model="formData.address" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="num" label="数量">
          <el-input v-model="formData.num" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="pid" label="确切需求物品" v-if="currentUpdateId">
          <el-select v-model="validationData.pid" class="m-2" placeholder="Select">
            <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.id" />
          </el-select>
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
</style>
