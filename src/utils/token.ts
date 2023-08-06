//封装本地存储与读取方法
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('TOKEN', token)
}
export const GET_TOKEN = () => {
  return localStorage.getItem('TOKEN')
}
//删除本地储存的方法
export const REMOVE_TOKEN = () => {
  localStorage.removeItem('TOKEN')
}
