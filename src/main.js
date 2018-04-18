// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 引入babel编译环境
import "babel-polyfill"
import store from './storage/vuex'
import localStorage from '@/storage/localStorage'
import sessionStorage from '@/storage/sessionStorage'
import Helper from '@/common/Helper'
// import '@/common/compatibility/explorer-top.js'
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/iconfont.css'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(localStorage)
Vue.use(sessionStorage)
Vue.use(Helper);
// let explorerelease = {
//     ie: 10,
//     firefox: 48,
//     chrome: 48,
//     opera: 38,
//     safari: 8
// }
// window.judgeBrowser(explorerelease)
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
