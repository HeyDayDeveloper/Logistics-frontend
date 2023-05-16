import { type RouteRecordRaw, createRouter, createWebHashHistory, createWebHistory } from "vue-router"

const Layout = () => import("@/layout/index.vue")

/** 常驻路由 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: Layout,
    meta: {
      hidden: true
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue")
      }
    ]
  },
  {
    path: "/403",
    component: () => import("@/views/error-page/403.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    meta: {
      hidden: true
    },
    alias: "/:pathMatch(.*)*"
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        component: () => import("@/views/home/index.vue"),
        name: "Home",
        meta: {
          title: "首页",
          svgIcon: "home",
          affix: true
        }
      }
    ]
  },
  {
    path: "/data",
    component: Layout,
    redirect: "/data-panel/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/data-panel/index.vue"),
        name: "DataPanel",
        meta: {
          title: "数据面板",
          svgIcon: "dashboard"
        }
      }
    ]
  },
  {
    path: "/material",
    component: Layout,
    redirect: "/material/material-inventory",
    name: "Material",
    meta: {
      title: "应急物资",
      svgIcon: "material"
    },
    children: [
      {
        path: "material-outbound",
        component: () => import("@/views/material/material-outbound/index.vue"),
        name: "MaterialOutbound",
        meta: {
          title: "物资出库"
        }
      },
      {
        path: "material-info",
        component: () => import("@/views/material/material-info/index.vue"),
        name: "MaterialInfo",
        meta: {
          title: "物资信息"
        }
      },
      {
        path: "material-application",
        component: () => import("@/views/material/material-application/index.vue"),
        name: "MaterialApplication",
        meta: {
          title: "物资申请"
        }
      },

      {
        path: "material-distribution",
        component: () => import("@/views/material/material-distribution/index.vue"),
        name: "MaterialDistribution",
        meta: {
          title: "配送方案"
        }
      },
      {
        path: "material-logistics",
        component: () => import("@/views/material/material-logistics/index.vue"),
        name: "MaterialLogistics",
        meta: {
          title: "物流信息"
        }
      }
    ]
  },
  {
    path: "/link",
    component: Layout,
    children: [
      {
        path: "http://127.0.0.1:2333/swagger-ui/index.html",
        component: () => {},
        name: "Link",
        meta: {
          title: "API页面",
          svgIcon: "link"
        }
      }
    ]
  },
  {
    path: "/about",
    component: Layout,
    redirect: "/about/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/about/index.vue"),
        name: "About",
        meta: {
          title: "致谢",
          svgIcon: "about"
        }
      }
    ]
  }
]

/**
 * 动态路由
 * 用来放置有权限 (Roles 属性) 的路由
 * 必须带有 Name 属性
 */
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: "/setup",
    component: Layout,
    redirect: "/setup/setup-permission",
    name: "SetupPermission",
    meta: {
      title: "设置中心",
      svgIcon: "setup",
      roles: ["admin", "normal"]
    },
    children: [
      {
        path: "setup-account",
        component: () => import("@/views/setup/account/index.vue"),
        name: "SetupAccount",
        meta: {
          title: "账号管理",
          svgIcon: "setup",
          roles: ["admin", "normal"]
        }
      }
    ]
  },
  {
    path: "/:pathMatch(.*)*", // Must put the 'ErrorPage' route at the end, 必须将 'ErrorPage' 路由放在最后
    redirect: "/404",
    name: "ErrorPage",
    meta: {
      hidden: true
    }
  }
]

const router = createRouter({
  history:
    import.meta.env.VITE_ROUTER_HISTORY === "hash"
      ? createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH)
      : createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: constantRoutes
})

/** 重置路由 */
export function resetRouter() {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch (error) {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload()
  }
}

export default router
