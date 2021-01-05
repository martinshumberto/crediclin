const bcrypt = require('bcryptjs')

module.exports = {
  up: (QueryInterface) => {
    return QueryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Administrador',
          email: 'admin@consilio.com.br',
          password_hash: bcrypt.hashSync('123ABC', 8),
          role: 0,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    )
  },

  down: () => {}
}
