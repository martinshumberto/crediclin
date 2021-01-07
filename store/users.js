import api from '../services/users'

const namespaced = true

const state = () => ({
  user: undefined,
  users: []
})

const getters = {
}

const mutations = {
  ADD_USER (state, payload) {
    state.users.data.unshift(payload)
  },
  SET_USERS (state, payload) {
    state.users = payload
  },
  SET_USER (state, payload) {
    state.user = payload
  },
  DEL_USER (state, id) {
    const userIndex = state.users.data.findIndex(u => u.id === id)
    state.users.data.splice(userIndex, 1)
  }
}

const actions = {
  store ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api(this.$axios).store(payload)
        .then(({ data }) => {
          commit('ADD_USER', data.return)
          resolve(data)
        })
        .catch((error) => { reject(error) })
    })
  },
  index ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api(this.$axios).index(payload)
        .then(({ data }) => {
          commit('SET_USERS', data)
          resolve(data)
        })
        .catch((error) => { reject(error) })
    })
  },
  show ({ commit }, id) {
    return new Promise((resolve, reject) => {
      api(this.$axios).show(id)
        .then(({ data }) => {
          commit('SET_USER', data)
          resolve(data)
        })
        .catch((error) => { reject(error) })
    })
  },
  update ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api(this.$axios).update(payload)
        .then(({ data }) => {
          resolve(data)
        })
        .catch((error) => { reject(error) })
    })
  },
  delete ({ commit }, id) {
    return new Promise((resolve, reject) => {
      api(this.$axios).delete(id)
        .then(({ data }) => {
          commit('DEL_USER', id)
          resolve(data)
        })
        .catch((error) => { reject(error) })
    })
  }
}

const debug = process.env.NODE_ENV !== 'production'

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions,
  strict: debug
}
