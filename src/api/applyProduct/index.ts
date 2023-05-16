import { request } from "@/utils/service"

// 获取
export function getApplyProductList() {
  return request({
    url: "order/list",
    method: "get"
  })
}
// 删除
export function deleteApplyProduct(id: string) {
  console.log(id)
  return request({
    url: `order/delete/${id}`,
    method: "delete"
  })
}

// 添加申请
export function addApplyProduct(data: any) {
  return request({
    url: "order/apply",
    method: "post",
    data
  })
}

// 审核
export function validationApplyProduct(data: any) {
  return request({
    url: "order/validation",
    method: "post",
    data
  })
}

// 更新
// export function updateApplyProduct(data: any) {
//   return request({
//     url: "order/update",
//     method: "patch",
//     data
//   })
// }
