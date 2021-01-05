'use strict'
const bcrypt = require('bcryptjs')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users',
      [{
        firstname: 'Humberto',
        lastname: 'Martins',
        email: 'humberto@consilio.com.br',
        password_hash: bcrypt.hashSync('123ABC', 8),
        role: 0
      }], {})
  },

  down: queryInterface => queryInterface.bulkDelete('users', null, {})
}
