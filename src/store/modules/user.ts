//用户小仓库
import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
import type { UserStore } from './types/types.ts'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token.ts'
import { constantRoute, asnycRoute, anyRoute } from '@/router/routes.ts'
import type {
  loginFormData,
  loginResponseData,
  userInfoReponseData,
} from '@/api/user/type.ts'
import router from '@/router'
//引入深拷贝方法
//@ts-expect-error
import cloneDeep from 'lodash/cloneDeep'
//过滤需要展示的路由
function filterAsyncRoute(asyncRoute: any, routes: any) {
  return asyncRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}
let useUserStore = defineStore('user', {
  //数据储存
  state: (): UserStore => {
    return {
      //用户唯一标识
      token: GET_TOKEN(),
      menuRoutes: constantRoute,
      username: '',
      avatar: '',
      buttons: [],
    }
  },
  //逻辑｜异步
  actions: {
    //用户登陆
    async userLogin(data: loginFormData) {
      let result: loginResponseData = await reqLogin(data)
      //登陆请求成功
      if (result.code == 200) {
        this.token = <string>result.data
        //本地存储
        SET_TOKEN(<string>result.data)
        return 'ok'
      } else {
        //登陆请求失败
        return Promise.reject(new Error(result.data))
      }
    },
    //获取用户信息
    async userInfo() {
      let result: userInfoReponseData = await reqUserInfo()
      //获取到用户信息进行储存
      if (result.code == 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        this.buttons = result.data.buttons
        //计算当前用户需要展示的异步路由
        const userAsyncRoute = filterAsyncRoute(
          cloneDeep(asnycRoute),
          result.data.routes,
        )
        this.menuRoutes = [...constantRoute, ...userAsyncRoute, anyRoute]
        ;[...userAsyncRoute, anyRoute].forEach((route: any) => {
          router.addRoute(route)
        })
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //退出
    async userLogout() {
      let result: any = await reqLogout()
      if (result.code == 200) {
        this.token = ''
        this.avatar = ''
        this.username = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  //计算属性
  getters: {},
})
export default useUserStore
