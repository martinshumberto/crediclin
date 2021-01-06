import axios from 'axios'

export const cep = axios.create({
  baseURL: 'https://viacep.com.br/ws/'
})
