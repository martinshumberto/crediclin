import api from '../services/api'

const namespaced = true

const state = () => ({
  customers: []
})

const getters = {
}

const mutations = {
  SET_CUSTOMERS (state, payload) {
    state.customers = payload
  }
}

const actions = {
  getCustomers ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api.getCustomers(payload)
        .then(({ data }) => {
          commit('SET_CUSTOMERS', data)
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
