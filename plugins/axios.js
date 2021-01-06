import Swal from 'sweetalert2'

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
      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'error',
        title: error.response.data.errors[0]
      })
      return Promise.reject(error.response)
    } else if (status === 500) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'error',
        title: 'Estamos enfrentando instabilidades no momento, tente novamente mais tarde.'
      })
      return Promise.reject(error.response)
    } else if (status === 401) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'error',
        title: error.response.data.errors[0]
      })
      // return Promise.reject(error.response)
    }
    return Promise.reject(error)
  })
}
