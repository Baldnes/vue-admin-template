import { createApp } from 'vue'
import ElementPlus from 'element-plus'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
//@ts-ignore
import App from '@/App.vue'
import 'virtual:svg-icons-register'
//自定义插件
import gloablComponent from './components/index'
import '@/styles/index.scss'
import router from '@/router/index.ts'
const app: App<Element> = createApp(App)
//国际话配置
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(gloablComponent)
app.use(router)
app.mount('#app')
