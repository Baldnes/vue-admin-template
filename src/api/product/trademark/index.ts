//品牌管理模块
import request from "@/utils/request.ts";
import {TrademarkData, TrademarkResponseData} from "@/api/product/trademark/type.ts";
enum API {
    //品牌数据
    TRADEMARK_URL = "/admin/product/baseTrademark/",
    //添加品牌
    ADDTRADEMARK_URL = "/admin/product/baseTrademark/save",
    //修改品牌
    UPDATATRADEMARK_URL = "/admin/product/baseTrademark/update",
    DELETE_URL = "/admin/product/baseTrademark/remove/"
}
//获取数据
export const reqHasTrademark = (page:number,limit:number)=>request.get<any,TrademarkResponseData>(API.TRADEMARK_URL+`${page}/${limit}`)
//添加或修改数据
export const reaAddOrUpdate = (data:TrademarkData)=>{
    if(data.id) {
        return request.put<any,any>(API.UPDATATRADEMARK_URL,data)
    } else {
        return request.post<any,any>(API.ADDTRADEMARK_URL,data)
    }
}
//删除数据
export const reqDeleteTrademark = (id:number)=>request.delete<any,any>(API.DELETE_URL + id)