import { RouteRecordRaw } from 'vue-router'
import { CategoryObj, ResponseData } from '@/api/product/attr/type.ts'

export interface UserStore {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
}

export interface setting {
  fold: boolean
  refsh: boolean
}

export interface CategoryState {
  c1Id: string | number
  c1Arr: CategoryObj[]
  c2Id: string | number
  c2Arr: CategoryObj[]
  c3Id: string | number
  c3Arr: CategoryObj[]
}

export interface AttrValue {
  id?: number
  valueName: string
  attrId?: number
  flag?: boolean
}

export type AttrValueList = AttrValue[]

export interface Attr {
  id?: number
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrValueList: AttrValueList[]
}
export type AttrList = Attr[]
export interface AttrResponseData extends ResponseData {
  data: Attr[]
}
