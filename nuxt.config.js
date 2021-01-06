import * as path from 'path'
require('dotenv').config()

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Nuxt target (https://nuxtjs.org/api/configuration-target)
  target: 'server',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'CrediClin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/css/main.scss'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    'plugins/filters.js',
    'plugins/sweetalert.js'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    'nuxt-buefy',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    credentials: true,
    baseUrl: process.env.API_SITE
  },

  // Auth module configuration (https://auth.nuxtjs.org/)
  auth: {
    redirect: {
      login: '/logar',
      logout: '/logar',
      home: '/'
    },
    strategies: {
      users: {
        scheme: 'local',
        token: {
          property: 'token',
          required: true,
          type: 'Bearer'
        },
        user: {
          autoFetch: true,
          property: false
        },
        endpoints: {
          login: {
            url: `${process.env.API_SITE}auth/users/login`,
            method: 'post'
          },
          logout: {
            url: `${process.env.API_SITE}auth/users/logout`,
            method: 'post'
          },
          user: {
            url: `${process.env.API_SITE}auth/users/logged`,
            method: 'get'
          }
        }
      }
    },
    plugins: [{ src: '~/plugins/axios', ssr: true }, '~/plugins/auth.js']
  },

  router: {
    middleware: ['auth']
  },

  /*
  ** Server Middleware
  */
  serverMiddleware: {
    '/api': '~/api'
  },

  server: {
    port: process.env.PORT, // default: 3000
    host: '0.0.0.0', // default: localhost,
    timing: false
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extractCSS: true
  },

  srcDir: path.resolve(__dirname)
}
