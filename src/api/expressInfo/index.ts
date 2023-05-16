import { request } from "@/utils/service"

// 获取
export function getExpressList() {
  return request({
    url: "express/list",
    method: "get"
  })
}
// 删除
export function deleteExpress(id: string) {
  console.log(id)
  return request({
    url: `express/delete/${id}`,
    method: "delete"
  })
}

// 添加
export function addExpress(data: any) {
  return request({
    url: "express/add",
    method: "put",
    data
  })
}

// 更新
export function updateExpress(data: any) {
  return request({
    url: "express/update",
    method: "patch",
    data
  })
}
// 查询
export function SearchExpress(id: string) {
  return request({
    url: `express/query/${id}`,
    method: "get"
  })
}
