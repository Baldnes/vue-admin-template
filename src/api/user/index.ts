//统一管理用户相关的接口
import request from '@/utils/request.ts'
import type {
  loginForm,
  loginResponseData,
  userResponseData,
} from '@/api/user/type.ts'

enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = 'user/info',
}

export const reqLogin = (data: loginForm) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)
export const reqUserInfo = () => request.get<userResponseData>(API.USERINFO_URL)
