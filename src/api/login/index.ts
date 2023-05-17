import { request } from "@/utils/service"
import type * as Login from "./types/login"

import { NotTokenRequest } from "@/utils/service"

// 注册
export function registerApi(data: any) {
  return NotTokenRequest({
    url: "/user/register",
    method: "post",
    data
  })
}

/** 获取登录验证码 */
export function getLoginCodeApi() {
  return request<Login.LoginCodeResponseData>({
    url: "login/code",
    method: "get"
  })
}

/** 登录并返回 Token */
export function loginApi(data: Login.ILoginRequestData) {
  return NotTokenRequest<Login.LoginResponseData>({
    url: "user/login",
    method: "post",
    data
  })
}

/** 获取用户详情 */
export function getUserInfoApi() {
  return request<Login.UserInfoResponseData>({
    url: "user/info",
    method: "get"
  })
}
