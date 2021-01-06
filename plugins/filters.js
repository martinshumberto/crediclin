import moment from 'moment'
import Vue from 'vue'

Vue.filter('uppercase', val => val.toUpperCase())

Vue.filter('trim', val => val.replace(/[^\d]+/g, ''))

Vue.filter('slugify', text =>
  text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036F]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-'))

Vue.filter('maskCPF', (cpf) => {
  cpf = typeof cpf !== 'string' ? cpf.toString() : cpf
  cpf = cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  return cpf
})

Vue.filter('maskCNPJ', (cnpj) => {
  cnpj = typeof cnpj !== 'string' ? cnpj.toString() : cnpj
  cnpj = cnpj.padStart(14, '0')
  cnpj = cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
  return cnpj
})

Vue.filter('maskPhone', function (v) {
  v = v.replace(/\D/g, '')
  v = v.replace(/^(\d{2})(\d)/g, '($1) $2')
  v = v.replace(/(\d)(\d{4})$/, '$1-$2')
  return v
})

Vue.filter('limitTo', function (s, l) {
  let nova = ''
  let ell = ''
  for (let i = 0; i < l; i++) {
    nova += s.substr(i, 1)
  }
  if (s.length > l) {
    ell = '...'
  }
  return nova + ell
})

Vue.filter('datetime', function (v) {
  const n = moment(v).format('DD/MM/YYYY HH:mm:ss')
  return n
})

Vue.filter('date', function (v) {
  const n = moment(v).format('DD/MM/YYYY')
  return n
})

Vue.filter('numberFromBR', function (v) {
  return v.replace(/\./g, '').replace(/,/g, '.')
})

Vue.filter('numberToBR', function (v) {
  if (v !== 0) {
    const value = v.toString()
    const valueParse = parseFloat(value).toFixed(2)
    const result = 'R$ ' + valueParse.replace(/,/g, '').replace(/\./g, ',')
    return result
  }
  return v
})

Vue.filter('convertPoints', function (v) {
  const value = v.toString()
  const valueParse = parseFloat(value).toFixed(2)
  return valueParse.replace(/,/g, '').replace(/\./g, ',')
})

Vue.filter('handlerTax', function (v) {
  if (v !== 0) {
    let value = v
    value = v.slice(0, -5)
    const result = value + '%'
    return result
  }
  return v
})

Vue.filter('reverse', function (value) {
  return value.slice().reverse()
})

Vue.filter('getFirstName', function (value) {
  const result = value.split(' ')
  return result[0]
})

Vue.filter('secToHours', function (value) {
  const num = value
  const min = (num / 60)
  const hours = (min / 60)
  const rhours = Math.floor(hours)
  const minutes = (hours - rhours) * 60
  const rminutes = Math.round(minutes)
  return rhours + ' hora(s) e ' + rminutes + ' minuto(s).'
})

Vue.filter('getAge', function (value) {
  const today = new Date()
  const birthDate = new Date(value)
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
})

Vue.filter('clearObject', function (obj) {
  return Object.keys(obj).reduce((acc, key) => ({ ...acc, ...(obj[key] && { [key]: obj[key] }) }), {})
})
