export default $axios => ({
  store (payload) {
    return $axios.post('/customers', payload)
  },
  index (payload) {
    const params = [
      `page=${payload.page}`
    ].join('&')

    return $axios.get(`/customers?${params}`)
  },
  show (id) {
    return $axios.get(`/customer/${id}`)
  },
  update (payload) {
    return $axios.put(`/customer/${payload.id}`, payload)
  },
  delete (id) {
    return $axios.delete(`/customer/${id}`)
  }
})
