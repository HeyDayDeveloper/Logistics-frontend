<script lang="ts" setup>
import { reactive, ref, watch } from "vue"
import { type IGetTableData } from "@/api/table/types/table"
import { type FormInstance, ElMessage, ElMessageBox } from "element-plus"
import { UserFilled } from "@element-plus/icons-vue"
import { Search, Refresh, CirclePlus, Delete, Download, RefreshRight } from "@element-plus/icons-vue"
import { usePagination } from "@/hooks/usePagination"
import { useUserListStore } from "@/store/modules/userList"

defineOptions({
  name: "ElementPlus"
})

const loading = ref<boolean>(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

//#region 增
const dialogVisible = ref<boolean>(false)
const formRef = ref<FormInstance | null>(null)
let formData: any = reactive({
  password: "12345678",
  avatar:
    "https://s1-imfile.feishucdn.com/static-resource/v1/v2_ce5552ab-e236-48a9-866d-fb6eab1e154g~?image_size=noop&cut_type=&quality=&format=image&sticker_format=.webp",
  email: "",
  nickname: "",
  phone_number: "",
  birth: "",
  sex: true
})
const handleCreate = () => {
  formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      if (currentUpdateId.value === undefined) {
        console.log(formData)

        const res = await useUserListStore().addUserList(formData)
        console.log(res)
        ElMessage.success("新增成功")
        dialogVisible.value = false
        getTableData()
      } else {
        delete formData!.password
        formData = { id: currentUpdateId.value, ...formData }
        console.log(formData)
        const res = await useUserListStore().updateUserList(formData)
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
  formData.email = ""
  formData.nickname = ""
  formData.phone_number = ""
  formData.birth = ""
  formData.sex = true
}
//#endregion

//#region 改
// 修改目标id
const currentUpdateId = ref<undefined | string>(undefined)
const handleUpdate = (row: any) => {
  currentUpdateId.value = row.id
  formData.email = row.email
  formData.nickname = row.nickname
  formData.phone_number = row.phone_number
  formData.sex = true
  formData.birth = row.birth
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
    const res = (await useUserListStore().getList()) as []
    console.log(res)
    originalData.value = res
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
    console.log(searchData)

    const res: any = await useUserListStore().searchUserList(searchData.id)
    console.log(res)
    tableData.value = []
    tableData.value.push(res)
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

    const res = await useUserListStore().deleteUserList(row.id)
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
    const res = await useUserListStore().deleteUserList(item)
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
          <el-button type="primary" :icon="CirclePlus" @click="dialogVisible = true">新增用户</el-button>
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
          <el-table-column prop="type" label="头像" align="center">
            <template #default="scope">
              <el-avatar v-if="scope.row.avatar" fit="fill" :src="scope.row.avatar" />
              <el-avatar v-else :icon="UserFilled" />
            </template>
          </el-table-column>
          <el-table-column prop="id" label="账号Id" align="center" />
          <el-table-column prop="username" label="用户账号" align="center" />
          <el-table-column prop="nickname" label="昵称" align="center" />
          <el-table-column prop="email" label="邮箱" align="center" />
          <el-table-column prop="sex" label="性别" align="center">
            <template #default="scope">
              <span v-if="scope.row.sex">男</span>
              <span v-else>女</span>
            </template>
          </el-table-column>
          <el-table-column prop="phone_number" label="手机号" align="center" />
          <el-table-column prop="type" label="权限" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.type === 1" type="success" effect="plain">管理员</el-tag>
              <el-tag v-else type="info" effect="plain">普通用户</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="birth" label="生日" align="center" />
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
      :title="currentUpdateId === undefined ? '新增用户' : '修改用户'"
      @close="resetForm"
      width="30%"
    >
      <el-form ref="formRef" :model="formData" label-width="100px" label-position="left">
        <el-form-item prop="nickname" label="昵称">
          <el-input v-model="formData.nickname" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="password" label="密码" v-if="currentUpdateId === undefined">
          <el-input v-model="formData.password" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="formData.email" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="phone_number" label="手机号">
          <el-input v-model="formData.phone_number" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="sex" label="性别">
          <el-radio-group v-model="formData.sex">
            <el-radio label="true" size="large">男</el-radio>
            <el-radio label="false" size="large">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="birth" label="生日">
          <el-date-picker v-model="formData.birth" type="date" placeholder="Pick a day" />
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
