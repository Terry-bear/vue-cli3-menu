module.exports = {
  // baseUrl
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/production-sub-path/'
    : '/haha'
}
