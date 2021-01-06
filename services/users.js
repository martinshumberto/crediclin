export default $axios => ({
  getUsers (payload) {
    const params = [
      `page=${payload.page}`
    ].join('&')

    return $axios.get(`/users?${params}`)
  }
})
