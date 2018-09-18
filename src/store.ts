import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const modules: any = {}
// !!require.context() 问题如何解决
// // 追加当前目录公共存储
// const commonfiles = require.context(`./store-common`, true, /.+-index\.js$/)

// commonfiles.keys().forEach(key => {
//   const k = key.match(/\.\/(\S*)-index\.js/)[1]
//   modules[k] = commonfiles(key).default
// })
// // 追加项目目录特有存储
// const projectfiles = require.context(`./${process.env.TARGET_PROJECT}/`, true, /.+-index\.js$/)

// projectfiles.keys().forEach(key => {
//   const k = key.match(/\/[^/]*$/)[0].match(/\/(\S*)-index\.js/)[1]
//   modules[k] = projectfiles(key).default
// })
console.log('modules--->', modules)

export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production'
})
