'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('customers',
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
        cep: '74815710',
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
        phone: '6235865423',
        cell: '62000000000',
        cpf: '00008043002',
        rg: '5007000',
        rg_issue_date: '2010-10-12',
        rg_organ_emitter: 'SSP DF',
        birth: '1995-06-06',
        cep: '74815710',
        address: 'Rua Fortaleza',
        complement: 'Aldebarã',
        number: 137,
        neighborhood: 'Alto da Glória',
        city: 'Goiânia',
        state: 'GO'
      },
      {
        firstname: 'Maria',
        lastname: 'Silva',
        email: 'maria@consilio.com.br',
        cell: '62000000001'
      },
      {
        firstname: 'Josefina',
        lastname: 'Souza',
        email: 'josefina@consilio.com.br',
        cell: '62000000002'
      },
      {
        firstname: 'Leandra',
        lastname: 'Dorneles',
        email: 'leandra@consilio.com.br',
        cell: '62000000003'
      },
      {
        firstname: 'Rogeria',
        lastname: 'Silva',
        email: 'rogeria@consilio.com.br',
        cell: '62000000004'
      }], {})
  },

  down: queryInterface => queryInterface.bulkDelete('customers', null, {})
}
