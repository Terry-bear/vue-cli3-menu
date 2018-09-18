import { setStore, getStore, removeStore } from '@/utils/store'
import * as types from '@/store-common/mutation-types'

const mutations = {
  // 设置全屏
  [types.SET_IS_FULLSCREEN](state, payload) {
    if (payload) {
      state.leftWith = 36
    } else {
      state.leftWith = getStore({ name: 'leftWith' })
    }
    state.isFullscreen = payload
  },

  // 设置当前Url
  [types.SET_MAIN_CONTENT_URL](state, payload) {
    if (payload === null || payload === 'null') {
      payload = '/404'
    }
    // console.log(payload)
    /.+\?$/.test(payload)
      ? (state.mainContentUrl = state.mainContentUrl.slice(0, -1))
      : state.mainContentUrl === payload
        ? (state.mainContentUrl = payload + '?')
        : (state.mainContentUrl = payload)
    // state.mainContentUrl = payload
    setStore({
      name: 'mainContentUrl',
      content: state.mainContentUrl,
      type: 'session'
    })
  },

  // 设置选中的index
  [types.SET_CURRENT_MENU_INDEX](state, payload) {
    state.currentMenuIndex = payload
    setStore({
      name: 'currentMenuIndex',
      content: state.currentMenuIndex,
      type: 'session'
    })
  },

  // 设置左菜单栏宽度
  [types.SET_LEFT_WITH](state, payload) {
    state.leftWith = payload
    setStore({ name: 'leftWith', content: state.leftWith, type: 'session' })
  },

  // 设置缩放
  [types.TOGGLE](state, payload) {
    if (state.leftWith === 256) {
      state.leftWith = 36
      setStore({ name: 'leftWith', content: state.leftWith, type: 'session' })
    } else {
      state.leftWith = 256
      setStore({ name: 'leftWith', content: state.leftWith, type: 'session' })
    }
  }
}

export default mutations
