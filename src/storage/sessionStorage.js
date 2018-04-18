const session = {};


session.install = (Vue) => {
   Vue.prototype.$getSessionStorageByName = session.$getSessionStorageByName;
   Vue.prototype.$setSessionStorageByName = session.$setSessionStorageByName;
   Vue.prototype.$removeSessionStorageByName = session.$removeSessionStorageByName;
}

session.$getSessionStorageByName = (name) => {
   if (!sessionStorage || !sessionStorage.getItem) {
      throw Error('浏览器不支持sessionStorage');
      return;
   }
   let s = name ? sessionStorage.getItem(name) : sessionStorage;
   try {
      return JSON.parse(s);
   } catch (e) {
      return s;
   }
}

session.$setSessionStorageByName = (name, value) => {
   if (!sessionStorage || !sessionStorage.setItem) {
      throw Error('浏览器不支持sessionStorage');
      return;
   }
   sessionStorage.setItem(name, typeof value === 'object' ? JSON.stringify(value) : value);
   // if(typeof name == 'object'){
   // 	for(var k in name){
   // 		if(typeof name[k] == 'undefined'){continue}
   // 		sessionStorage.setItem(k,name[k]);
   // 	}
   // }else{
   // 	sessionStorage.setItem(name,value);
   // }
}
session.$removeSessionStorageByName = (name) => {
   if (!sessionStorage || !sessionStorage.setItem) {
      throw Error('浏览器不支持sessionStorage');
      return;
   }
   sessionStorage.removeItem(name);
}
export default session;
