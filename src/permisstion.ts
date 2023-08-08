//路由鉴权
import router from '@/router'
//@ts-ignore
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
//获取token
import useUserStore from '@/store/modules/user.ts'
import pinia from '@/store'
import setting from '@/setting.ts'
nprogress.configure({ showSpinner: false })
let userStore = useUserStore(pinia)
let username: string = userStore.username

//全局前置守卫
//@ts-ignore
router.beforeEach(async (to: any, from: any, next: any) => {
  //页面标题
  document.title = `${setting.title} - ${to.meta.title}`
  //访问某一个路由前
  nprogress.start()
  //获取token，判断是否登陆
  let token = userStore.token
  if (token) {
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      if (username) {
        next()
      } else {
        //如果没有用户信息就发送请求
        try {
          await userStore.userInfo()
          next()
        } catch (error) {
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})
//全局后置守卫
//@ts-ignore
router.afterEach((to: any, from: any) => {
  nprogress.done()
})
