/**
 * 基于JWT,解析token中obj进行权限控制
 * @param {Object} _this 挂载new对象的this
 * @param {String} arg 传入参变量arg
 */
export default class Controler {
  constructor(_this, arg) {
    this._this = _this
  }

  /**
   * 获取def中的值并作为key查询tokenObj中的value转数组
   * !返回值是array
   */
  defToKeyArr () {
    let companyDef = this._this.$store.state.menu.tokenObj.def
    let author = this._this.$store.state.menu.tokenObj[companyDef]
    return author.split(/,/)
  }

  /**
   *
   * @param {Array} arr  需要查询的权限数组
   * @param {String} str 查询权限中是否存在对应值
   * ! 返回值是Boolean
   */
  searchAuthor (arr, str) {
    let result
    let resultStatus
    result = arr.filter((arg) => { return arg === str })
    result.length > 0 ? resultStatus = true : resultStatus = false
    return resultStatus
  }
}
