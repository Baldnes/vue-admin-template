//用户小仓库
import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo } from '@/api/user'
import type { loginForm, loginResponseData } from '@/api/user/type.ts'
import type { UserStore } from './types/types.ts'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token.ts'
import { constantRoute } from '@/router/routes.ts'

let useUserStore = defineStore('user', {
  //数据储存
  state: (): UserStore => {
    return {
      //用户唯一标识
      token: GET_TOKEN(),
      menuRoutes: constantRoute,
      username: '',
      avatar: '',
    }
  },
  //逻辑｜异步
  actions: {
    //用户登陆
    async userLogin(data: loginForm) {
      let result: loginResponseData = await reqLogin(data)
      //登陆请求成功
      if (result.code == 200) {
        this.token = <string>result.data.token
        //本地存储
        SET_TOKEN(<string>result.data.token)
        return 'ok'
      } else {
        //登陆请求失败
        return Promise.reject(new Error(result.data.message))
      }
    },
    //获取用户信息
    async userInfo() {
      let result = await reqUserInfo()
      //获取到用户信息进行储存
      // @ts-ignore
      if (result.code == 200) {
        // @ts-ignore
        this.username = result.data.checkUser.username
        // @ts-ignore
        this.avatar = result.data.checkUser.avatar
        return 'ok'
      } else {
        return Promise.reject('获取用户信息失败')
      }
    },
    //退出
    userLogout() {
      //清空用户信息
      this.token = ''
      this.username = ''
      this.avatar = ''
      REMOVE_TOKEN()
    },
  },
  //计算属性
  getters: {},
})
export default useUserStore
