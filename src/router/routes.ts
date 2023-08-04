
export const constantRoute = [
  {
    path: '/login',
    // @ts-ignore
    component: () => import('@/views/login/index.vue'),
    name: 'login',
  },
  {
    path: '/',
    // @ts-ignore
    component: () => import('@/views/home/index.vue'),
    name: 'layout',
  },
  {
    path: '/404',
// @ts-ignore
    component: () => import('@/views/404/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
  },
]
