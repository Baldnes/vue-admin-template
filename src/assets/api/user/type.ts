//登陆类型
//参数
export interface  loginForm{
    username:string,
    password:string
}
//返回数据
interface dataType{
    token:string
}
export interface loginResponseData{
    code:number,
    data:dataType
}

//用户信息类型
interface userInfo {
    userId:number,
    avatar:string,
    username:string,
    password:string,
    desc:string,
    roles:string[],
    buttons:string[],
    routes: string[],
    token:string
}
interface user{
    checkUser:userInfo
}
export interface userResponseData {
    code:number,
    data:user
}
