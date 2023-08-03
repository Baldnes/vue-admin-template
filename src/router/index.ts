import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoute } from './routes.ts'

let router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoute,
  scrollBehavior(): { left: number; top: number } {
    return {
      left: 0,
      top: 0,
    }
  },
})
export default router
