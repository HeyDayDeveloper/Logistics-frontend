<script lang="ts" setup>
import { nextTick, reactive, ref } from "vue"
import { type ElMessageBoxOptions, ElMessageBox, ElMessage } from "element-plus"
import {
  type VxeGridInstance,
  type VxeGridProps,
  type VxeModalInstance,
  type VxeModalProps,
  type VxeFormInstance,
  type VxeFormProps,
  type VxeGridPropTypes,
  type VxeFormDefines
} from "vxe-table"
import { deleteTableDataApi } from "@/api/table"

defineOptions({
  name: "VxeTable"
})

//#region vxe-grid
interface IRowMeta {
  id: string
  username: string
  roles: string
  phone: string
  email: string
  status: boolean
  createTime: string
  /** vxe-table 自动添加上去的属性 */
  _VXE_ID?: string
}

interface Props {
  xGridOpt: VxeGridProps
}

const props = defineProps<Props>()

console.log(props.xGridOpt)

const xGridDom = ref<VxeGridInstance>()
//#endregion

//#region vxe-modal
const xModalDom = ref<VxeModalInstance>()
const xModalOpt: VxeModalProps = reactive({
  title: "",
  showClose: true,
  escClosable: true,
  maskClosable: true,
  beforeHideMethod: () => {
    xFormDom.value?.clearValidate()
    return Promise.resolve()
  }
})
//#endregion

//#region vxe-form
const xFormDom = ref<VxeFormInstance>()
const xFormOpt = reactive<VxeFormProps>({
  span: 24,
  titleWidth: "100px",
  loading: false,
  /** 是否显示标题冒号 */
  titleColon: false,
  /** 表单数据 */
  data: {
    username: "",
    password: ""
  },
  /** 项列表 */
  items: [
    {
      field: "username",
      title: "用户名",
      itemRender: { name: "$input", props: { placeholder: "请输入" } }
    },
    {
      field: "password",
      title: "密码",
      itemRender: { name: "$input", props: { placeholder: "请输入" } }
    },
    {
      align: "right",
      itemRender: {
        name: "$buttons",
        children: [
          { props: { content: "取消" }, events: { click: () => xModalDom.value?.close() } },
          {
            props: { type: "submit", content: "确定", status: "primary" },
            events: { click: () => crudStore.onSubmitForm() }
          }
        ]
      }
    }
  ],
  /** 校验规则 */
  rules: {
    username: [
      {
        required: true,
        validator: ({ itemValue }) => {
          if (!itemValue) {
            return new Error("请输入")
          }
          if (!itemValue.trim()) {
            return new Error("空格无效")
          }
        }
      }
    ],
    password: [
      {
        required: true,
        validator: ({ itemValue }) => {
          if (!itemValue) {
            return new Error("请输入")
          }
          if (!itemValue.trim()) {
            return new Error("空格无效")
          }
        }
      }
    ]
  }
})
//#endregion

//#region CRUD
const crudStore = reactive({
  /** 表单类型：修改：true 新增：false */
  isUpdate: true,
  /** 加载表格数据 */
  commitQuery: () => xGridDom.value?.commitProxy("query"),
  /** 清空表格数据 */
  clearTable: () => xGridDom.value?.reloadData([]),
  /** 点击显示弹窗 */
  onShowModal: (row?: IRowMeta) => {
    if (row) {
      crudStore.isUpdate = true
      xModalOpt.title = "修改用户"
      // 赋值
      xFormOpt.data.username = row.username
    } else {
      crudStore.isUpdate = false
      xModalOpt.title = "新增用户"
    }
    // 禁用表单项
    if (xFormOpt.items) {
      if (xFormOpt.items[0]?.itemRender?.props) {
        xFormOpt.items[0].itemRender.props.disabled = crudStore.isUpdate
      }
    }
    xModalDom.value?.open()
    nextTick(() => {
      !crudStore.isUpdate && xFormDom.value?.reset()
      xFormDom.value?.clearValidate()
    })
  },
  /** 确定并保存 */
  onSubmitForm: () => {
    if (xFormOpt.loading) return
    xFormDom.value?.validate((errMap?: VxeFormDefines.ValidateErrorMapParams) => {
      if (errMap) return
      xFormOpt.loading = true
      const callback = (err?: any) => {
        xFormOpt.loading = false
        if (err) return
        xModalDom.value?.close()
        ElMessage.success("操作成功")
        !crudStore.isUpdate && crudStore.afterInsert()
        crudStore.commitQuery()
      }
      if (crudStore.isUpdate) {
        // 调用修改接口
        setTimeout(() => callback(), 1000)
      } else {
        // 调用新增接口
        setTimeout(() => callback(), 1000)
      }
    })
  },
  /** 新增后是否跳入最后一页 */
  afterInsert: () => {
    const pager: VxeGridPropTypes.ProxyAjaxQueryPageParams = xGridDom.value?.getProxyInfo()?.pager
    if (pager) {
      const currTotal: number = pager.currentPage * pager.pageSize
      if (currTotal === pager.total) {
        ++pager.currentPage
      }
    }
  },
  /** 删除 */
  onDelete: (row: IRowMeta) => {
    const tip = `确定 <strong style='color:red;'>删除</strong> 用户 <strong style='color:#409eff;'>${row.username}</strong> ？`
    const config: ElMessageBoxOptions = {
      type: "warning",
      showClose: true,
      closeOnClickModal: true,
      closeOnPressEscape: true,
      cancelButtonText: "取消",
      confirmButtonText: "确定",
      dangerouslyUseHTMLString: true
    }
    ElMessageBox.confirm(tip, "提示", config)
      .then(() => {
        deleteTableDataApi(row.id)
          .then(() => {
            ElMessage.success("删除成功")
            crudStore.afterDelete()
            crudStore.commitQuery()
          })
          .catch(() => 1)
      })
      .catch(() => 1)
  },
  /** 删除后是否返回上一页 */
  afterDelete: () => {
    const tableData: IRowMeta[] = xGridDom.value!.getData()
    const pager: VxeGridPropTypes.ProxyAjaxQueryPageParams = xGridDom.value?.getProxyInfo()?.pager
    if (pager && pager.currentPage > 1 && tableData.length === 1) {
      --pager.currentPage
    }
  },
  /** 更多自定义方法 */
  moreFunc: () => {}
})
//#endregion
</script>

<template>
  <div class="app-container">
    <!-- 表格 -->
    <vxe-grid ref="xGridDom" v-bind="props.xGridOpt">
      <!-- 左侧按钮列表 -->
      <template #toolbar-btns>
        <vxe-button status="primary" icon="vxe-icon-add" @click="crudStore.onShowModal()">新增用户</vxe-button>
        <vxe-button status="danger" icon="vxe-icon-delete">批量删除</vxe-button>
      </template>
      <!-- 操作 -->
      <template #row-operate="{ row }">
        <el-button link type="primary" @click="crudStore.onShowModal(row)">修改</el-button>
        <el-button link type="danger" @click="crudStore.onDelete(row)">删除</el-button>
      </template>
    </vxe-grid>
    <!-- 弹窗 -->
    <vxe-modal ref="xModalDom" v-bind="xModalOpt">
      <!-- 表单 -->
      <vxe-form ref="xFormDom" v-bind="xFormOpt" />
    </vxe-modal>
  </div>
</template>

<style lang="scss" scoped></style>
