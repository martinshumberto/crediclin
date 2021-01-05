import api from '../services/api'

const namespaced = true

const state = () => ({
  users: []
})

const getters = {
}

const mutations = {
  SET_USERS (state, payload) {
    state.users = payload
  }
}

const actions = {
  getUsers ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api.getUsers(payload)
        .then(({ data }) => {
          commit('SET_USERS', data)
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
