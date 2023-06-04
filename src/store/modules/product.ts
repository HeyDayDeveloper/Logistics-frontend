import { defineStore } from "pinia"
import store from "@/store"
import { addProduct, deleteProduct, getProductList, searchProduct, updateProduct } from "@/api/product"
import { ref } from "vue"

export const useProductStore = defineStore("product", () => {
  const data = ref<object>({})

  const getData = () => {
    return new Promise((resolve, reject) => {
      getProductList()
        .then((res: any) => {
          data.value = res.data
          console.log(res.data)
          resolve(data.value)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  // 添加物资
  const addData = (formData: any) => {
    return new Promise((resolve, reject) => {
      addProduct(formData)
        .then((res) => {
          console.log(res)
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  // 修改物资
  const updateData = (data: any) => {
    return new Promise((resolve, reject) => {
      console.log(data)
      updateProduct(data)
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
    console.log(id)

    return new Promise((resolve, reject) => {
      deleteProduct(id)
        .then((res: any) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  // 查询
  const getSearchData = (name: string) => {
    return new Promise((resolve, reject) => {
      searchProduct(name)
        .then((res: any) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  return { getData, addData, deleteData, updateData, getSearchData }
})

/** 在 setup 外使用 */
export function useProductStoreHook() {
  return useProductStore(store)
}
