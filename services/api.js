import axios from 'axios'

const request = axios.create({
  baseURL: `${process.env.API_SITE}`
})

export default {
  getCustomers (payload) {
    const params = [
      `page=${payload.page}`
    ].join('&')

    return request.get(`/customers?${params}`)
  },
  getUsers (payload) {
    const params = [
      `page=${payload.page}`
    ].join('&')

    return request.get(`/users?${params}`)
  }
}
