import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
import { addUser, deleteUser, getUserList, searchUser, updateUser } from "@/api/user"
import { formatDateTime } from "@/utils"

export const useUserListStore = defineStore("userList", () => {
  const userList = ref<object[]>([])

  // 获取用户列表
  const getList = () => {
    return new Promise((resolve, reject) => {
      getUserList()
        .then((res: any) => {
          const data = res.data
          console.log(data)
          data.map((item: any) => {
            ;(item.birth = formatDateTime(item.birth, "YYYY-MM-DD")),
              (item.create_time = formatDateTime(item.create_time))
          })
          userList.value = data
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  // 增加
  const addUserList = (data: any) => {
    return new Promise((resolve, reject) => {
      addUser(data)
        .then((res: any) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  // 修改
  const updateUserList = (data: any) => {
    return new Promise((resolve, reject) => {
      updateUser(data)
        .then((res: any) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  // 删除
  const deleteUserList = (id: string) => {
    return new Promise((resolve, reject) => {
      deleteUser(id)
        .then((res: any) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  // 查询
  const searchUserList = (id: string) => {
    return new Promise((resolve, reject) => {
      searchUser(id)
        .then((res: any) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  return { getList, addUserList, updateUserList, deleteUserList, searchUserList }
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserListStore(store)
}
