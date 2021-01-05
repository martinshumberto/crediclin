import bcrypt from 'bcryptjs'
import Sequelize, { Model } from 'sequelize'

class User extends Model {
  static init (sequelize) {
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.VIRTUAL,
      password_hash: Sequelize.STRING,
      role: Sequelize.INTEGER
    }, {
      sequelize,
      paranoid: true
    })

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8)
      }
    })
    return this
  }

  // Relacionamento da tabela de ususarios com a tabela de file
  // static associate (models) {
  //   this.belongsTo(models.File, { foreignKey: 'avatar_id' })
  // }

  checkPassword (password) {
    return bcrypt.compare(password, this.password_hash)
  }
}

export default User