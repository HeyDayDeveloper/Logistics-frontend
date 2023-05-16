import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
import { SearchOutStock, addOutStock, deleteOutStock, getOutStockList, updateOutStock } from "@/api/outStock"

export const useOutStockListStore = defineStore("outStock", () => {
  const OutStockListt = ref<object[]>([])

  // 获取列表
  const getList = () => {
    return new Promise((resolve, reject) => {
      getOutStockList()
        .then((res: any) => {
          const data = res.data
          console.log(data)
          OutStockListt.value = data
          resolve(data)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  }

  // 增加
  const addOutStockList = (data: any) => {
    return new Promise((resolve, reject) => {
      addOutStock(data)
        .then((res: any) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  // 修改
  const updateOutStockList = (data: any) => {
    return new Promise((resolve, reject) => {
      updateOutStock(data)
        .then((res: any) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  // 删除
  const deleteOutStockList = (id: string) => {
    return new Promise((resolve, reject) => {
      deleteOutStock(id)
        .then((res: any) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  // 查询
  const searchOutStockList = (id: string) => {
    return new Promise((resolve, reject) => {
      SearchOutStock(id)
        .then((res: any) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  return { getList, addOutStockList, updateOutStockList, deleteOutStockList, searchOutStockList }
})

/** 在 setup 外使用 */
export function useOutStockListStoreHook() {
  return useOutStockListStore(store)
}
