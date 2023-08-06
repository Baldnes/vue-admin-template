export const constantRoute = [
  {
    path: '/login',
    // @ts-ignore
    component: () => import('@/views/login/index.vue'),
    name: 'Login',
    meta: {
      title: '登陆',
      hidden: true,
      icon: 'Pointer',
    },
  },
  {
    path: '/',
    // @ts-ignore
    component: () => import('@/layout/index.vue'),
    name: 'Layout',
    redirect: '/home',
    meta: {
      title: '',
      hidden: false,
      icon: '',
    },
    children: [
      {
        path: '/home',
        // @ts-ignore
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
    ],
  },
  {
    path: '/screen',
    name: 'Screen',
    // @ts-ignore
    component: () => import('@/views/screen/index.vue'),
    meta: {
      hidden: false,
      title: '数据大屏',
      icon: 'Platform',
    },
  },
  {
    path: '/acl',
    // @ts-ignore
    component: () => import('@/layout/index.vue'),
    name: 'Acl',
    redirect: '/acl/user',
    meta: {
      title: '权限管理',
      hidden: false,
      icon: 'Avatar',
    },
    children: [
      {
        path: '/acl/user',
        // @ts-ignore
        component: () => import('@/views/acl/user/index.vue'),
        name: 'User',
        meta: {
          title: '用户管理',
          hidden: false,
          icon: 'User',
        },
      },
      {
        path: '/acl/rule',
        // @ts-ignore
        component: () => import('@/views/acl/rule/index.vue'),
        name: 'Rule',
        meta: {
          title: '角色管理',
          hidden: false,
          icon: 'More',
        },
      },
      {
        path: '/acl/permission',
        // @ts-ignore
        component: () => import('@/views/acl/permission/index.vue'),
        name: 'Permission',
        meta: {
          title: '菜单管理',
          hidden: false,
          icon: 'Finished',
        },
      },
    ],
  },
  {
    path: '/product',
    // @ts-ignore
    component: () => import('@/layout/index.vue'),
    name: 'Product',
    redirect: '/product/tradmark',
    meta: {
      title: '商品管理',
      hidden: false,
      icon: 'GoodsFilled',
    },
    children: [
      {
        path: '/product/tradmark',
        name: 'Tradmark',
        // @ts-ignore
        component: () => import('@/views/product/tradmark/index.vue'),
        meta: {
          title: '品牌管理',
          hidden: false,
          icon: 'Handbag',
        },
      },
      {
        path: '/product/attr',
        name: 'Attr',
        // @ts-ignore
        component: () => import('@/views/product/attr/index.vue'),
        meta: {
          title: '属性管理',
          hidden: false,
          icon: 'Help',
        },
      },
      {
        path: '/product/spu',
        name: 'Spu',
        // @ts-ignore
        component: () => import('@/views/product/spu/index.vue'),
        meta: {
          title: 'SPU管理',
          hidden: false,
          icon: 'Wallet',
        },
      },
      {
        path: '/product/sku',
        name: 'Sku',
        // @ts-ignore
        component: () => import('@/views/product/sku/index.vue'),
        meta: {
          title: 'SKU管理',
          hidden: false,
          icon: 'Setting',
        },
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    // @ts-ignore
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404',
      hidden: true,
      icon: 'CircleClose',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: '任意路由',
      hidden: true,
      icon: 'SwitchButton',
    },
  },
]
