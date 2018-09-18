import { setStore, getStore, removeStore } from '@/utils/store'

// 部分参数依赖存储，保证浏览器刷新(sessionStorage)和关闭后使用(localStorage)
const state = {
  leftWith: getStore({ name: 'leftWith' }) || 256,
  mainContentUrl: getStore({ name: 'mainContentUrl' }) || '/index',
  currentMenuIndex: getStore({ name: 'currentMenuIndex' }) || ',0',
  isFullscreen: false
}

export default state
