export default $axios => ({
  store (payload) {
    return $axios.post('/users', payload)
  },
  index (payload) {
    const params = [
      `page=${payload.page}`
    ].join('&')

    return $axios.get(`/users?${params}`)
  },
  show (id) {
    return $axios.get(`/user/${id}`)
  },
  update (payload) {
    return $axios.put(`/user/${payload.id}`, payload)
  },
  delete (id) {
    return $axios.delete(`/user/${id}`)
  }
})
