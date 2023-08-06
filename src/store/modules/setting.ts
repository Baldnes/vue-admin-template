//layout组件相关的配置仓库
import {defineStore} from "pinia";
import {setting} from './types/types.ts'
let useLayOutSettingStore = defineStore('SettingStore', {
    state: ():setting => {
        return {
            fold:false,//菜单折叠
            refsh:false//控制刷新
        }
    }
})
export default useLayOutSettingStore