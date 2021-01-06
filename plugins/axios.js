
export default ({ $axios, $auth, store, route }) => {
  if ($auth) {
    const token = $auth.strategy.token.get($auth.$state.strategy) // $auth.strategy.token.get($auth.$state.strategy)

    $axios.defaults.headers.common.Authorization = token
    $axios.defaults.headers.common.Accept = 'application/json'
  }

  $axios.defaults.baseURL = process.env.API_SITE

  $axios.onRequest((config) => {
    if (process.client) {
      window.$nuxt.$loading.start()
    }
    return config
  })
  $axios.onRequestError((config) => {
    if (process.client) {
      window.$nuxt.$loading.start()
    }
    return config
  })

  $axios.onResponse((response) => {
    if (process.client) {
      window.$nuxt.$loading.finish()
    }
    return response
  })
  $axios.onResponseError((error) => {
    if (process.client) {
      window.$nuxt.$loading.finish()
    }
    const status = parseInt(error.response ? error.response.status : null)

    if (status === 422 || status === 412 || status === 400 || status === 403) {
      return Promise.reject(error.response)
    } else if (status === 500) {
      return Promise.reject(error.response)
    } else if (status === 401) {
      return Promise.reject(error.response)
    }
    return Promise.reject(error)
  })
}
