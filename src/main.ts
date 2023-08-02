import { createApp } from 'vue'
import ElementPlus from 'element-plus'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
//@ts-ignore
import App from '@/App.vue'
const app = createApp(App)
//国际话配置
app.use(ElementPlus, {
    locale: zhCn,
})
console.log(import.meta.env)
app.mount('#app')