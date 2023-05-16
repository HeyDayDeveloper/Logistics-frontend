import { request } from "@/utils/service"

// 获取
export function getOutStockList() {
  return request({
    url: "outStock/list",
    method: "get"
  })
}
// 删除
export function deleteOutStock(id: string) {
  console.log(id)
  return request({
    url: `outStock/delete/${id}`,
    method: "delete"
  })
}

// 添加
export function addOutStock(data: any) {
  return request({
    url: "outStock/add",
    method: "put",
    data
  })
}

// 更新
export function updateOutStock(data: any) {
  return request({
    url: "outStock/update",
    method: "patch",
    data
  })
}

// 查询
export function SearchOutStock(id: string) {
  return request({
    url: `outStock/query/${id}`,
    method: "get"
  })
}
