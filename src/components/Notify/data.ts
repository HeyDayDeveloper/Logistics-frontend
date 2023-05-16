export interface IListItem {
  avatar?: string
  title: string
  datetime?: string
  description?: string
  status?: "" | "success" | "info" | "warning" | "danger"
  extra?: string
}

export const notifyData: IListItem[] = [
  {
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png",
    title: "V3 Admin 上线啦",
    datetime: "一年前",
    description: "一个中后台管理系统基础解决方案，基于 Vue3、TypeScript、Element Plus 和 Pinia"
  }
]

export const messageData: IListItem[] = [
  {
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
    title: "来自楚门的世界",
    description: "如果再也不能见到你，祝你早安、午安和晚安",
    datetime: "1998-06-05"
  }
]

export const todoData: IListItem[] = [
  {
    title: "任务名称",
    description: "这家伙很懒，什么都没留下",
    extra: "进行中",
    status: ""
  }
]
