require('dotenv').config()

module.exports = {
  dialect: 'mysql',
  host: '127.0.0.1',
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  define: {
    timestamps: false,
    underscored: true,
    underscoredAll: true
  }
}
