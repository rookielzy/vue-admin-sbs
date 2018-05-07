import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    avatar: '',
    name: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    Login ({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(res => {
          setToken(res.token)
          commit('SET_TOKEN', res.token)

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    Logout ({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(res => {
          removeToken()
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetUserInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(res => {
          commit('SET_AVATAR', res.avatar)
          commit('SET_NAME', res.name)
          commit('SET_ROLES', res.roles)

          console.log(res, 'get user info success')

          resolve(res)
        })
      })
    }
  }
}

export default user
