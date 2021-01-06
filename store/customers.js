import api from '../services/api'

const namespaced = true

const state = () => ({
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
  DEL_CUSTOMER (state, id) {
    const customerIndex = state.customers.data.findIndex(u => u.id === id)
    state.customers.data.splice(customerIndex, 1)
  }
}

const actions = {
  addCustomer ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api.addCustomer(payload)
        .then(({ data }) => {
          commit('ADD_CUSTOMER', data.return)
          resolve(data)
        })
        .catch((error) => { reject(error) })
    })
  },
  getCustomers ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api.getCustomers(payload)
        .then(({ data }) => {
          commit('SET_CUSTOMERS', data)
          resolve(data)
        })
        .catch((error) => { reject(error) })
    })
  },
  delCustomer ({ commit }, id) {
    return new Promise((resolve, reject) => {
      api.delCustomer(id)
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
