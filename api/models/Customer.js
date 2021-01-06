import Sequelize, { Model } from 'sequelize'

class Customer extends Model {
  static init (sequelize) {
    super.init({
      firstname: Sequelize.STRING,
      lastname: Sequelize.STRING,
      email: Sequelize.STRING,
      phone: Sequelize.STRING,
      cell: Sequelize.STRING,
      cpf: Sequelize.STRING,
      rg: Sequelize.STRING,
      rg_issue_date: Sequelize.DATE,
      rg_organ_emitter: Sequelize.STRING,
      birth: Sequelize.DATE,
      cep: Sequelize.STRING,
      address: Sequelize.STRING,
      complement: Sequelize.STRING,
      number: Sequelize.INTEGER,
      neighborhood: Sequelize.STRING,
      city: Sequelize.STRING,
      state: Sequelize.STRING
    }, {
      sequelize,
      paranoid: true,
      timestamps: false,
      underscored: true
    })

    return this
  }
}

export default Customer
