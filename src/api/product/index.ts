import { request } from "@/utils/service"

// 获取物资列表
export function getProductList() {
  return request({
    url: "product/list",
    method: "get"
  })
}

// 添加物资
export function addProduct(data: any) {
  return request({
    url: "product/add",
    method: "put",
    data
  })
}

// 更新物资
export function updateProduct(data: any) {
  return request({
    url: "product/update",
    method: "patch",
    data
  })
}
// 删除物资
export function deleteProduct(id: string) {
  console.log(id)

  return request({
    url: `product/delete/${id}`,
    method: "delete"
  })
}

// 查询
export function searchProduct(name: string) {
  return request({
    url: `product/query/${name}`,
    method: "get"
  })
}
