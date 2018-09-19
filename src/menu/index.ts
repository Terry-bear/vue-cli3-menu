import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(ElementUI, { locale })

// TODO Layout including header and sideBar
const Layout = (r: any) =>
  (require as any).ensure([], () => r(require('@/components/Layout'), 'index')) // Layout
const Header = (r: any) =>
  (require as any).ensure([], () => r(require('./view/index/Header'), 'index')) // Header
const Side = (r: any) =>
  (require as any).ensure([], () => r(require('./view/components/Side'), 'index')) // Side

// TODO content framework
const MainContent = (r: any) =>
  (require as any).ensure([], () => r(require('@/components/MainContent'), 'index')) // MainContent
const error = (r: any) =>
  (require as any).ensure([], () => r(require('@/components/404'), 'error')) // Header

// TODO login page including register and index pages
const login = (r: any) =>
  (require as any).ensure([], () => r(require('./view/login/index'), 'login')) // Header
const register = (r: any) =>
  (require as any).ensure([], () => r(require('./view/login/register'), 'register')) // Header
const index = (r: any) =>
  (require as any).ensure([], () => r(require('./view/index/index'), 'index')) // Header

export default [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        meta: {
          title: '人和致远服务平台',
          requiresAuth: true,
          layoutTopHeight: 48,
          layoutTop: Header,
          layoutLeft: Side
        },
        component: MainContent
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  },
  {
    path: '/404',
    component: error
  },
  {
    path: '/login',
    meta: {
      title: '登录页',
      requiresAuth: false
    },
    component: login
  },
  {
    path: '/register',
    meta: {
      title: '注册页',
      requiresAuth: false
    },
    component: register
  },
  {
    path: '/index',
    meta: {
      title: '欢迎页',
      requiresAuth: false
    },
    component: index
  }
]
