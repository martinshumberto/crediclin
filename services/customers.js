export default $axios => ({
  addCustomer (payload) {
    return $axios.post('/customers', payload)
  },
  getCustomers (payload) {
    const params = [
      `page=${payload.page}`
    ].join('&')

    return $axios.get(`/customers?${params}`)
  },
  delCustomer (id) {
    return $axios.delete(`/customers/${id}`)
  }
})
