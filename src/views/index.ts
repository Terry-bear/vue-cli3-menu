import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(ElementUI, { locale })


export default [
  {
    path: '/',
    name: 'home',
    component: 'home'
  },
  {
    path: '/about',
    name: 'about',
    component: 'about'
  }
]
