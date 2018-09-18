// 通用全局函数
export default {
  /**
   * 日期格式化
   * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符
   * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
   * @param {Number} timestapm 后端传入时间
   */
  dateFormat(timestapm) {
    if (timestapm) {
      let date = new Date(timestapm * 1000)
      let Y = date.getFullYear() + '-'
      let M =
        (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) + '-'
      let D = date.getDate() + ' '
      let h = date.getHours() + ':'
      let m = date.getMinutes() + ':'
      let s = date.getSeconds()
      return Y + M + D + h + m + s
    } else {
      return null
    }
  },

  /**
   * 对象或数组排序方法，按一个字段数值大小排序
   * 使用方法：
   * data.sort(this.$utils.rank('prop', true))
   * @param {String} prop 排序的键名
   * @param {Boolean} desc 升序或降序，true为降序，false从升序
   */
  rank(prop, desc) {
    return function(obj1, obj2) {
      var val1 = obj1[prop]
      var val2 = obj2[prop]
      if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
        val1 = Number(val1)
        val2 = Number(val2)
      }
      return desc ? (val1 < val2 ? 1 : -1) : val1 > val2 ? 1 : -1
    }
  },
  
  /*
  * 身份证脱敏处理
  * */

  /**
   * 查找数组中所有对象的某一个键是否存在某个值，如存在，返回序号，不存在，返回-1
   * @param {Array} array 查找的数组
   * @param {String} attr 数组中对象的键名
   * @param {any} val 对象的键值
   */
  findObjIndex(array, attr, val) {
    for (var i = 0; i < array.length; i++) {
      if (array[i][attr] === val) {
        return i
      }
    }
    return -1
  },

  /**
   * @method randomString  随机生成文件名
   * @param {String} len
   */
  randomString(len = 6) {
    len = len || 32
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
    var maxPos = chars.length
    var pwd = ''
    for (let i = 0; i < len; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return pwd
  },
  find(list, f) {
    return list.filter(f)[0]
  },
  deepCopy(obj, cache = []) {
    // just return if obj is immutable value
    if (obj === null || typeof obj !== 'object') {
      return obj
    }

    // if obj is hit, it is in circular structure
    const hit = find(cache, c => c.original === obj)
    if (hit) {
      return hit.copy
    }

    const copy = Array.isArray(obj) ? [] : {}
    // put the copy into cache at first
    // because we want to refer it in recursive deepCopy
    cache.push({
      original: obj,
      copy
    })

    Object.keys(obj).forEach(key => {
      copy[key] = this.deepCopy(obj[key], cache)
    })

    return copy
  }
}
