import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(ElementUI, { locale })

const Home = (r: any) =>
  (require as any).ensure([], () => r(require('@/views/Home'), 'Home')) // 新建
const About = (r: any) =>
  (require as any).ensure([], () => r(require('@/views/About'), 'About')) // 新建

export default [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  }
]
