import { defineStore } from "pinia"
import store from "@/store"
import { ref } from "vue"
import { addApplyProduct, deleteApplyProduct, getApplyProductList, validationApplyProduct } from "@/api/applyProduct"

export const useApplyProductStore = defineStore("applyProduct", () => {
  const ApplyProductList = ref<object>({})

  const getData = () => {
    return new Promise((resolve, reject) => {
      getApplyProductList()
        .then((res: any) => {
          ApplyProductList.value = res.data
          console.log(res.data)
          resolve(ApplyProductList.value)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  // 添加
  const addData = (formData: any) => {
    return new Promise((resolve, reject) => {
      addApplyProduct(formData)
        .then((res) => {
          console.log(res)
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  // 提交审核
  const validationData = (data: any) => {
    return new Promise((resolve, reject) => {
      console.log(data)
      validationApplyProduct(data)
        .then((res) => {
          console.log(res)
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  // 删除物资
  const deleteData = (id: string) => {
    return new Promise((resolve, reject) => {
      deleteApplyProduct(id)
        .then((res: any) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  // 查询
  // const getSearchData = (data: object) => {
  //   return new Promise((resolve, reject) => {
  //     searchProduct(data!.name)
  //       .then((res: any) => {
  //         resolve(res)
  //       })
  //       .catch((err) => {
  //         reject(err)
  //       })
  //   })
  // }

  return { getData, addData, deleteData, validationData }
})

/** 在 setup 外使用 */
export function useProductStoreHook() {
  return useApplyProductStore(store)
}
