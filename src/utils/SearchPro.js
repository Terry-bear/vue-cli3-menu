/**
 * 基于element-ui 搜索字体高亮方法
 * @param {Array:Object} list 查询data值
 * @param {String} fiter 搜索关键字
 */
const fontColor = '#409EFF'
export default class SearchPro {
  constructor(list, filter) {
    this.list = list
    this.filter = filter
  }

  /**
   * 格式化关键字搜索后的list数组
   * @param {String} filter 搜索关键字
   */
  fmtLists () {
    const fSN = this.filter
    if (fSN) {
      return this.list.filter(dataNews => {
        return Object.keys(dataNews).some(key => {
          return String(dataNews[key]).toLowerCase().indexOf(fSN) > -1
        })
      })
    }
    return this.list
  }

  /**
   * 格式化搜索选中值的显示
   * @param {String} val 当前选中参数
   */
  fmtData(val) {
    const fSN = this.filter
    if (val.indexOf(fSN) !== -1 && fSN !== '') {
      return val.replace(fSN, `<font color="${fontColor}">` + fSN + '</font>')
    } else {
      return val
    }
  }
}
