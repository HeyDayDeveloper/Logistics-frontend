import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
import { SearchExpress, addExpress, deleteExpress, getExpressList, updateExpress } from "@/api/expressInfo"

export const useExpressStore = defineStore("outStock", () => {
  const ExpressList = ref<object[]>([])

  // 获取列表
  const getList = () => {
    return new Promise((resolve, reject) => {
      getExpressList()
        .then((res: any) => {
          const data = res.data
          console.log(data)
          ExpressList.value = data
          resolve(data)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  }

  // 增加
  const addExpressList = (data: any) => {
    return new Promise((resolve, reject) => {
      addExpress(data)
        .then((res: any) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  // 修改
  const updateExpressList = (data: any) => {
    return new Promise((resolve, reject) => {
      updateExpress(data)
        .then((res: any) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  // 删除
  const deleteExpressList = (id: string) => {
    return new Promise((resolve, reject) => {
      deleteExpress(id)
        .then((res: any) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  // 查询
  const searchExpressList = (id: string) => {
    return new Promise((resolve, reject) => {
      SearchExpress(id)
        .then((res: any) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  return { getList, addExpressList, updateExpressList, deleteExpressList, searchExpressList }
})

/** 在 setup 外使用 */
export function useExpressStoreHook() {
  return useExpressStore(store)
}
