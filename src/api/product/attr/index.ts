//属性管理
import request from '@/utils/request.ts'
import { CategoryResponseData } from '@/api/product/attr/type.ts'
import { AttrResponseData, Attr } from '@/store/modules/types/types.ts'
enum API {
  C1_URL = '/admin/product/getCategory1',
  C2_URL = '/admin/product/getCategory2/',
  C3_URL = '/admin/product/getCategory3/',
  //表格数据
  ATTR_URL = '/admin/product/attrInfoList/',
  //添加或修改属性
  ADDORUPDATA_URL = '/admin/product/saveAttrInfo',
  //删除某一个已有的属性
  DELETEATTR_URL = '/admin/product/deleteAttr/',
}
// 获取一级分类
export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL)
// 获取二级分类
export const reqC2 = (category1Id: number | string) =>
  request.get<any, CategoryResponseData>(API.C2_URL + category1Id)
// 获取三级分类
export const reqC3 = (category2Id: number | string) =>
  request.get<any, CategoryResponseData>(API.C3_URL + category2Id)
//获取分类表格数据
export const reqAttr = (
  category1Id: number | string,
  category2Id: number | string,
  category3Id: number | string,
) =>
  request.get<any, AttrResponseData>(
    API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`,
  )
//添加或修改属性
export const reqAddOrUpdateAttr = (data: Attr) =>
  request.post<any, any>(API.ADDORUPDATA_URL, data)
//删除某一个已有的属性业务
export const reqRemoveAttr = (attrId: number) =>
  request.delete<any, any>(API.DELETEATTR_URL + attrId)
