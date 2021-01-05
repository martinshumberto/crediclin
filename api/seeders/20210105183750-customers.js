'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users',
      [{
        firstname: 'Humberto',
        lastname: 'Martins',
        email: 'humberto@consilio.com.br',
        phone: '6235865423',
        cell: '62983465454',
        cpf: '70028043162',
        rg: '5877334',
        rg_issue_date: '2010-10-12',
        rg_organ_emitter: 'SSP GO',
        birth: '1995-06-06',
        address: 'Rua Fortaleza',
        complement: 'Aldebarã',
        number: 137,
        neighborhood: 'Alto da Glória',
        city: 'Goiânia',
        state: 'GO'
      },
      {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john@consilio.com.br',
        phone: '6200000000',
        cell: '62000000000',
        cpf: '00008043002',
        rg: '5007000',
        rg_issue_date: '2010-10-12',
        rg_organ_emitter: 'SSP DF',
        birth: '1995-06-06',
        address: 'Rua Fortaleza',
        complement: 'Aldebarã',
        number: 137,
        neighborhood: 'Alto da Glória',
        city: 'Goiânia',
        state: 'GO'
      }], {})
  },

  down: queryInterface => queryInterface.bulkDelete('users', null, {})
}
