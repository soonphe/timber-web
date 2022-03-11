// 可以将网络请求放入action操作方法中
// import { login, logout, getInfo } from '@/api/user'
const state = {
  // 用户对象
  user: {},
  // 角色列表类型
  role: {},
  // 菜单列表类型
  menu: {}
}
const actions = {
  saveUser: ({ commit }, payload) => {
    commit('SAVEAUSER', payload)
  },
  clearUser: ({ commit }) => {
    commit('CLEARUSER')
  },
  saveRole: ({ commit }, payload) => {
    commit('SAVEROLE', payload)
  },
  clearRole: ({ commit }) => {
    commit('CLEARROLE')
  },
  saveMenu: ({ commit }, payload) => {
    commit('SAVEMENU', payload)
  },
  clearMenu: ({ commit }) => {
    commit('CLEARMENU')
  }
}
const mutations = {
  SAVEAUSER: (state, payload) => {
    state.user = payload
  },
  CLEARUSER: (state) => {
    state.user = {}
  },
  SAVEROLE: (state, payload) => {
    state.role = payload
  },
  CLEARROLE: (state) => {
    state.role = {}
  },
  SAVEMENU: (state, payload) => {
    state.menu = payload
  },
  CLEARMENU: (state) => {
    state.menu = {}
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
