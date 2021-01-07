import api from '../services/customers'

const namespaced = true

const state = () => ({
  customer: undefined,
  customers: []
})

const getters = {
}

const mutations = {
  ADD_CUSTOMER (state, payload) {
    state.customers.data.unshift(payload)
  },
  SET_CUSTOMERS (state, payload) {
    state.customers = payload
  },
  SET_CUSTOMER (state, payload) {
    state.customer = payload
  },
  DEL_CUSTOMER (state, id) {
    const customerIndex = state.customers.data.findIndex(u => u.id === id)
    state.customers.data.splice(customerIndex, 1)
  }
}

const actions = {
  store ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api(this.$axios).store(payload)
        .then(({ data }) => {
          commit('ADD_CUSTOMER', data.return)
          resolve(data)
        })
        .catch((error) => { reject(error) })
    })
  },
  index ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api(this.$axios).index(payload)
        .then(({ data }) => {
          commit('SET_CUSTOMERS', data)
          resolve(data)
        })
        .catch((error) => { reject(error) })
    })
  },
  show ({ commit }, id) {
    return new Promise((resolve, reject) => {
      api(this.$axios).show(id)
        .then(({ data }) => {
          commit('SET_CUSTOMER', data)
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
          commit('DEL_CUSTOMER', id)
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
