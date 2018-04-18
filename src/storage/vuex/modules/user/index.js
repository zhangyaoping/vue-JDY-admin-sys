import Api from '@/api'
import sessionStorage from '@/storage/sessionStorage'
import {Message} from 'element-ui';

const state = {
  // 用户名
  userName: '',
  // token
  tokenId: '',
  // 角色名
  roleName: '',
  //setUuerId
  userId: ''

}

const getters = {}

const mutations = {
  setName: (state, data) => {
    if (data) {
      sessionStorage.$setSessionStorageByName('userName', encodeURI(data))
    } else {
      sessionStorage.$removeSessionStorageByName('userName')
    }
    state.userName = data
  },
  setToken: (state, data) => {
    if (data) {
      sessionStorage.$setSessionStorageByName('tokenId', data)
    } else {
      sessionStorage.$removeSessionStorageByName('tokenId')
    }
    state.tokenId = data
  },
  setRole: (state, data) => {
    if (data) {
      sessionStorage.$setSessionStorageByName('roleName', encodeURI(data))
    } else {
      sessionStorage.$removeSessionStorageByName('roleName')
    }
    state.roleName = data
  },
  setUuerId: (state, data) => {
    if (data) {
      sessionStorage.$setSessionStorageByName('userId', data)
    } else {
      sessionStorage.$removeSessionStorageByName('userId')
    }
    state.userId = data
  }
}

const actions = {
  // 登录
  loginByPhone({commit, rootState}, userInfo) {
    return new Promise((resolve, reject) => {
      Api.testApi.postLoginSignIn(userInfo).then(res => {
        if (res.code === '0000') {
          if (res.data) {
            // console.log('res---------------', res.data)
            commit('setName', res.data.userName)
            commit('setRole', res.data.roleName)
            commit('setToken', res.data.tokenId)
            commit('setUuerId', res.data.userId)
          }
          resolve(res.data)
        }

      })
    });
  },
  // 登出
  logout({commit}) {
    return new Promise((resolve) => {
      commit('setName', '')
      commit('setToken', '')
      commit('setRole', '')
      commit('setUuerId', '')
      resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
