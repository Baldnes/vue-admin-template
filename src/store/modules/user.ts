//用户小仓库
import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user'
import type { loginForm, loginResponseData } from '@/api/user/type.ts'
import type { UserStore } from './types/types.ts'
import { SET_TOKEN, GET_TOKEN } from '@/utils/token.ts'

let useUserStore = defineStore('user', {
  //数据储存
  state: (): UserStore => {
    return {
      //用户唯一标识
      token: GET_TOKEN(),
    }
  },
  //逻辑｜异步
  actions: {
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
  },
  //计算属性
  getters: {},
})
export default useUserStore
