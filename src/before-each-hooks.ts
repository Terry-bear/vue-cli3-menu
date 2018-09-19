import store from './store'

export default {
  // https://router.vuejs.org/zh-cn/advanced/meta.html
  checkLoginAuth(to, from, next) {
    // 设置页面的title
    if (to.meta.title) {
      document.title = to.meta.title
    }

    // 对设置了requiresAuth的meta路由验证权限
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // 权限验证方法，根据业务需要自行编写
      const permission = getPermission()

      if (!permission) {
        next({
          path: '/login',
          replace: true
          // query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    } else {
      // 不需要权限的路由，一定要调用 next()
      next()
    }

    function getPermission() {
      // 因为采用JWT签名token内包含权限标识，故无需前端权限验证方法，只需有token即可
      if (store.getters.token) {
        return true
      } else {
        return false
      }
    }
  }
}
