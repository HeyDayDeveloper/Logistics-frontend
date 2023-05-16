import { request } from "@/utils/service"

// 获取
export function getUserList() {
  return request({
    url: "user/list",
    method: "get"
  })
}
// 删除
export function deleteUser(id: string) {
  console.log(id)
  return request({
    url: `user/delete/${id}`,
    method: "delete"
  })
}

// 添加
export function addUser(data: any) {
  return request({
    url: "user/register",
    method: "post",
    data
  })
}

// 更新
export function updateUser(data: any) {
  return request({
    url: "user/update",
    method: "patch",
    data
  })
}

// 查询
export function searchUser(id: string) {
  return request({
    url: `user/query/${id}`,
    method: "get"
  })
}
