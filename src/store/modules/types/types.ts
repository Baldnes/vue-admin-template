import {RouteRecordRaw} from "vue-router";

export interface UserStore {
  token: string | null,
  menuRoutes:RouteRecordRaw[],
  username:string,
  avatar:string
}
export interface setting {
  fold: boolean,
  refsh:boolean
}
