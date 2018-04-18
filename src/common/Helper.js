import Vue from 'vue'
import numeral from 'numeral'
class Helper {
  constructor() {

  }

  clone(obj, deep = true) {
    if (typeof obj !== 'object') {
      return obj;
    }
    if (deep) {
      if (Array.isArray(obj)) {
        let cloneObj = [];
        for (let [, o] of obj.entries()) {
          cloneObj.push(this.clone(o, true));
        }
        return cloneObj;
      } else {
        let cloneObj = {}
        for (let k in obj) {
          if (Array.isArray(obj[k])) {
            let a = []
            for (let i = 0; i < obj[k].length; i++) {
              a.push(this.clone(obj[k][i], true))
            }
            cloneObj[k] = a;
          } else if (typeof obj[k] !== 'object') {
            cloneObj[k] = obj[k];
          } else {
            cloneObj[k] = this.clone(obj[k], true);
          }
        }
        return cloneObj;
      }
    } else {
      if (Array.isArray(obj)) {
        return [].concat(obj);
      } else {
        return Object.assign({}, obj);
      }
    }
  }

  entries(obj) {
    return Object.entries(obj)
  }

  isEmptyObj(obj) {
    for (let key in obj) {
      if (obj[key]) {
        return false
      }
    }
    return true;
  }

  extendData(target, ...cloneObj) {
    let clone = (out, obj) => {
      out = out || {};
      if (!obj) {

      } else {
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (Array.isArray(obj[key])) {
              out[key] = [].concat(out[key] || [], obj[key]);
            } else if (typeof obj[key] === 'object') {
              out[key] = clone(out[key], obj[key]);
            }
            else {
              out[key] = obj[key];
            }
          }
        }
      }
      return out;
    }
    for (let [, o] of cloneObj.entries()) {
      target = clone(target, o);
    }
    return target;
  }

  getFormData(form = {}) {
    let data = {};
    for (let key in form) {
      if (typeof form[key] === 'object' && 'rules' in form[key] && 'domValue' in form[key]) {
        data[key] = form[key]['domValue'];
      } else {
        data[key] = form[key];
      }
    }
    return this.removeEmptyPro(data);
  }

  removeEmptyPro(form) {
    for (let v in form) {
      if (form[v] === '') {
        delete form[v];
      }
    }
    return form;
  }

  initForm(form = {}) {
    let init = (obj) => {
      if (typeof obj !== 'object' || obj instanceof Date) {
        return '';
      }
      if (Array.isArray(obj)) {
        return []
      }
      for (let key in obj) {
        if (typeof obj[key] === 'object') {
          if ('domValue' in obj[key]) {
            obj[key].domValue = '';
          } else {
            obj[key] = init(obj[key]);
          }
        } else {
          obj[key] = '';
        }
      }
      return obj;
    }
    return init(form);
  }

  getDate(timeStamp = new Date().getTime(), splitSymble = '-', disDay = 0) {
    if (typeof timeStamp === 'string') {
      timeStamp = timeStamp.replace(/-/g, '/');
    }
    let date = new Date(new Date(timeStamp).getTime() - disDay * 24 * 60 * 60 * 1000);
    let beauty = (num) => {
      return num > 9 ? num : '0' + num;
    }
    return date.getFullYear() + splitSymble + beauty(date.getMonth() + 1) + splitSymble + beauty(date.getDate());
  }

  getTimeDetail(timeStamp = new Date().getTime(), splitSymble = '-', hms) {
    if (typeof timeStamp === 'string') {
      timeStamp = timeStamp.replace(/-/g, '/');
    }
    let date = new Date(timeStamp);
    let formatDate = '';
    let beauty = (num) => {
      return num > 9 ? num : '0' + num;
    }
    formatDate = hms === 'minutes' ? beauty(date.getHours()) : beauty(date.getHours()) + splitSymble + beauty(date.getMinutes()) + splitSymble + beauty(date.getSeconds());
    return formatDate;
  }

  setContainerFullHeight($container = document.querySelectorAll('.container')[1]) {
    let _height = document.body.clientHeight - document.querySelectorAll('.container')[0].clientHeight;
    $container.style.minHeight = _height - 2 + 'px';
  }

  ossParam({width = '', height = ''} = {width: 320, height: 320}) {
    let p = '?x-oss-process=image/resize';
    if (height) {
      p += ',h_' + height;
    }
    if (width) {
      p += ',w_' + width;
    }
    return p
  }

  // 弃用
  printArea(id) {
    if (!id) {
      return
    }
    let el = document.getElementById(id);
    let iframe = document.createElement('iframe');
    let doc = null;
    iframe.setAttribute('style', 'position:absolute;width:0;height:0,left:-9999px');
    document.body.appendChild(iframe);
    doc = iframe.contentWindow.document;
    doc.write('<div>' + el.innerHTML + '</div>');
    doc.close();
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
  }

  addIframe(url) {
    let iframe = document.createElement('iframe');
    iframe.setAttribute('src', url);
    iframe.setAttribute('style', 'position:absolute;width:0;height:0,left:-9999px');
    document.body.appendChild(iframe);
    return iframe;
  }

  test() {
    // //Console.log('helper loaded',p);
    return 'xxx';
  }
}
Helper.prototype.numeral = numeral;
export default {
  install (){
    Vue.prototype.Helper = new Helper();
  }
}
