import { Base64 } from 'js-base64'

/**
 * base64的编码和解码
 * 获取token中userid
 */
var hexIn = false
var hexOut = false
var base64EncodeChars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
var base64DecodeChars = [
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
  52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
  -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
  15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
  -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1]
export default class InvertByBase64 {
  constructor(token) {
    this.token = token
  }

  /**
   * @method encode 字符编码为base64格式
   */
  encode() {
    return Base64.encode(this.token)
  }

  /**
   * @method decode 字符解码为可用值
   */
  decode() {
    return Base64.decode(this.token)
  }

  /**
   * 解析token中的信息并转化为obj
   */
  regInfo() {
    let token
    try {
      token = this.decode()
    } catch (error) {
      token = this.base64decode(this.token)
    }
    // console.log('token', token)
    let result
    result = token.match(/({.*?}){2}/)
    if (result.length > 0 || result !== null) {
      // console.log('正确解析出token')
      // console.log(result[1])
      // console.log(JSON.parse(result[1]))
      return JSON.parse(result[1])
    } else {
      console.error('没有正确解析出token')
      return {}
    }
  }
  /**
   * ?多菜单的tokenInfoObj转换为数组
   * *return 输出对象为Array
   * @param {Object} obj 转换对象
   */
  authorObjToArr(obj) {
    if (obj.length === 0 || obj === null || obj === undefined) {
      console.error('无法转化,请检查数据是否正确输入!')
      return []
    } else {
      return obj.split(/,/)
    }
  }

  // !--------base64

  base64encode(str) {
    var out, i, len
    var c1, c2, c3
    var charCode

    len = str.length
    i = 0
    out = ''
    while (i < len) {
      c1 = (hexIn ? str[i++] : str.charCodeAt(i++)) & 0xff
      if (i === len) {
        out += base64EncodeChars.charAt(c1 >> 2)
        out += base64EncodeChars.charAt((c1 & 0x3) << 4)
        out += '=='
        break
      }
      c2 = hexIn ? str[i++] : str.charCodeAt(i++)
      if (i === len) {
        out += base64EncodeChars.charAt(c1 >> 2)
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4))
        out += base64EncodeChars.charAt((c2 & 0xf) << 2)
        out += '='
        break
      }
      c3 = hexIn ? str[i++] : str.charCodeAt(i++)
      out += base64EncodeChars.charAt(c1 >> 2)
      out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4))
      out += base64EncodeChars.charAt(((c2 & 0xf) << 2) | ((c3 & 0xc0) >> 6))
      out += base64EncodeChars.charAt(c3 & 0x3f)
    }
    return out
  }

  base64decode(str) {
    var c1, c2, c3, c4
    var i, len, out
    var charCode

    len = str.length
    i = 0
    out = hexOut ? [] : ''
    while (i < len) {
      /* c1 */
      do {
        c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
      } while (i < len && c1 === -1)
      if (c1 === -1) break

      /* c2 */
      do {
        c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
      } while (i < len && c2 === -1)
      if (c2 === -1) break

      charCode = (c1 << 2) | ((c2 & 0x30) >> 4)
      hexOut ? out.push(charCode) : (out += String.fromCharCode(charCode))

      /* c3 */
      do {
        c3 = str.charCodeAt(i++) & 0xff
        if (c3 === 61) return out
        c3 = base64DecodeChars[c3]
      } while (i < len && c3 === -1)
      if (c3 === -1) break
      charCode = ((c2 & 0xf) << 4) | ((c3 & 0x3c) >> 2)
      hexOut ? out.push(charCode) : (out += String.fromCharCode(charCode))

      /* c4 */
      do {
        c4 = str.charCodeAt(i++) & 0xff
        if (c4 === 61) return out
        c4 = base64DecodeChars[c4]
      } while (i < len && c4 === -1)
      if (c4 === -1) break
      charCode = ((c3 & 0x03) << 6) | c4
      hexOut ? out.push(charCode) : (out += String.fromCharCode(charCode))
    }
    return out
  }

  utf16to8(str) {
    var out, i, len, c
    var charCode
    out = hexIn ? [] : ''
    len = str.length
    for (i = 0; i < len; i++) {
      c = hexIn ? str[i] : str.charCodeAt(i)
      if (c >= 0x0001 && c <= 0x007f) {
        hexIn ? out.push(str[i]) : (out += str.charAt(i))
      } else if (c > 0x07ff) {
        charCode = 0xe0 | ((c >> 12) & 0x0f)
        hexIn ? out.push(charCode) : (out += String.fromCharCode(charCode))
        charCode = 0x80 | ((c >> 6) & 0x3f)
        hexIn ? out.push(charCode) : (out += String.fromCharCode(charCode))
        charCode = 0x80 | ((c >> 0) & 0x3f)
        hexIn ? out.push(charCode) : (out += String.fromCharCode(charCode))
      } else {
        charCode = 0xc0 | ((c >> 6) & 0x1f)
        hexIn ? out.push(charCode) : (out += String.fromCharCode(charCode))
        charCode = 0x80 | ((c >> 0) & 0x3f)
        hexIn ? out.push(charCode) : (out += String.fromCharCode(charCode))
      }
    }
    return out
  }

  utf8to16(str) {
    var out, i, len, c
    var char2, char3
    var charCode

    out = hexOut ? [] : ''
    len = str.length
    i = 0
    while (i < len) {
      c = hexOut ? str[i++] : str.charCodeAt(i++)
      switch (c >> 4) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          // 0xxxxxxx
          hexOut ? out.push(str[i - 1]) : (out += str.charAt(i - 1))
          break
        case 12:
        case 13:
          // 110x xxxx   10xx xxxx
          char2 = hexOut ? str[i++] : str.charCodeAt(i++)
          charCode = ((c & 0x1f) << 6) | (char2 & 0x3f)
          hexOut ? out.push(charCode) : (out += String.fromCharCode(charCode))
          break
        case 14:
          // 1110 xxxx  10xx xxxx  10xx xxxx
          char2 = hexOut ? str[i++] : str.charCodeAt(i++)
          char3 = hexOut ? str[i++] : str.charCodeAt(i++)
          charCode =
            ((c & 0x0f) << 12) | ((char2 & 0x3f) << 6) | ((char3 & 0x3f) << 0)
          hexOut ? out.push(charCode) : (out += String.fromCharCode(charCode))
          break
      }
    }

    return out
  }

  CharToHex(str) {
    var out, i, len, c, h
    out = ''
    len = str.length
    i = 0
    while (i < len) {
      c = str.charCodeAt(i++)
      h = c.toString(16)
      if (h.length < 2) h = '0' + h

      out += '\\x' + h + ' '
      if (i > 0 && i % 8 === 0) out += '\r\n'
    }

    return out
  }

  base64Encode(src, hI) {
    hexIn = hI
    return this.base64encode(this.utf16to8(src))
  }

  base64Decode(src, hO, outDe) {
    hexOut = hO
    var ret = this.base64decode(src)
    if (!hexOut || outDe === 'u' || outDe === 'd') {
      ret = this.utf8to16(ret)
    }
    return ret
  }

  base64Gb2312(src, op) {
    var ret = ''
    // $.ajax({
    //   url: '/ajax/base64Gb2312.php?type=' + op,
    //   data: {
    //     data: src
    //   },
    //   async: false,
    //   type: 'POST',
    //   success: (e) {
    //     ret = e
    //   }
    // })
    return ret
  }

  base64EncodeGb2312(src) {
    return this.base64Gb2312(src, 'encode')
  }

  base64DecodeGb2312(src) {
    return this.base64Gb2312(src, 'decode')
  }
}
