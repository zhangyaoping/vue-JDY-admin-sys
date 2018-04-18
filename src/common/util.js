/**
 * Created by jerry on 2017/4/14.
 */
var SIGN_REGEXP = /([yMdhsm])(\1*)/g
var DEFAULT_PATTERN = 'yyyy-MM-dd'
function padding(s, len) {
  let l = len - (s + '').length
  for (var i = 0; i < l; i++) {
    s = '0' + s
  }
  return s
};

export default {
  getQueryStringByName: function (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var r = window.location.search.substr(1).match(reg)
    var context = ''
    if (r != null) {
      context = r[2]
    }
    reg = null
    r = null
    return context === null || context === '' || context === 'undefined' ? '' : context
  },
  // 去掉对象中空字段
  checkBe: function (obj) {
    if (!(typeof obj == 'object')) {
      return;
    }
    ;
    for (var key in obj) {
      if (obj.hasOwnProperty(key)
        && (obj[key] == null || obj[key] == undefined || obj[key] == '')) {
        delete obj[key];
      }
    }
    return obj;
  },
  formatDate: {
    //时间转换
    format: function (date, pattern) {
      pattern = pattern || DEFAULT_PATTERN
      return pattern.replace(SIGN_REGEXP, function ($0) {
        switch ($0.charAt(0)) {
          case 'y':
            return padding(date.getFullYear(), $0.length)
          case 'M':
            return padding(date.getMonth() + 1, $0.length)
          case 'd':
            return padding(date.getDate(), $0.length)
          case 'w':
            return date.getDay() + 1
          case 'h':
            return padding(date.getHours(), $0.length)
          case 'm':
            return padding(date.getMinutes(), $0.length)
          case 's':
            return padding(date.getSeconds(), $0.length)
        }
      })
    },
    parse: function (dateString, pattern) {
      var matchs1 = pattern.match(SIGN_REGEXP)
      var matchs2 = dateString.match(/(\d)+/g)
      if (matchs1.length === matchs2.length) {
        var _date = new Date(1970, 0, 1)
        for (var i = 0; i < matchs1.length; i++) {
          var _int = parseInt(matchs2[i])
          var sign = matchs1[i]
          switch (sign.charAt(0)) {
            case 'y':
              _date.setFullYear(_int);
              break
            case 'M':
              _date.setMonth(_int - 1);
              break
            case 'd':
              _date.setDate(_int);
              break
            case 'h':
              _date.setHours(_int);
              break
            case 'm':
              _date.setMinutes(_int);
              break
            case 's':
              _date.setSeconds(_int);
              break
          }
        }
        return _date
      }
      return null
    },
    /**
     * 当前时间
     * @param {*} array
     * @param {*} arrName
     * @param {*} value
     */
    getNowTime () {
      let date = new Date()
      let seperator1 = '-'
      let seperator2 = ':'
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + ' ' + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds()
      return currentdate
    },
    /**
     * 判断数组中的对象 是否相同
     * @param {*} array
     * @param {*} arrName
     * @param {*} value
     */
    contains (array, arrName, value) {
      let i = array.length
      while (i--) {
        if (array[i][arrName] === value) {
          return true
        }
      }
      return false
    },
    /**
     * 获取元素在数组中的 位置 index
     */
    arrayAttrToIndex (array, attr, str) {
      for (var i = 0; i < array.length; i++) {
        if (array[i][attr] === str) return i
      }
      return 0
    },
  }
}
