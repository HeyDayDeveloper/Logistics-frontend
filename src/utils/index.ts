import dayjs from "dayjs"

/** 格式化时间 */
export const formatDateTime = (time: string | number | Date, Specifications = "YYYY-MM-DD HH:mm:ss") => {
  if (!time) {
    return "未知"
  }
  const date = new Date(time)
  return dayjs(date).format(Specifications)
}

// 转换权限(0为普通老师，1为管理员，2为捐赠者)
export const convertPermissions = (type = 0) => {
  const permissionsMap = new Map<number, string>([
    [0, "教师"],
    [1, "管理员"],
    [2, "捐赠者"]
  ])
  return permissionsMap.get(type)
}

/** 将全局 CSS 变量导入 JS 中使用 */
export const getCssVariableValue = (cssVariableName: string) => {
  let cssVariableValue = ""
  try {
    // 没有拿到值时，会返回空串
    cssVariableValue = getComputedStyle(document.documentElement).getPropertyValue(cssVariableName)
  } catch (error) {
    console.error(error)
  }
  return cssVariableValue
}
