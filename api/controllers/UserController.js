import * as Yup from 'yup'
import User from '../models/User'

class UserController {
  async store (req, res) {
    const schema = Yup.object().shape({
      firstname: Yup.string().required('O primeiro nome é obrigátorio.'),
      lastname: Yup.string().required('O sobrenome é obrigátorio.'),
      email: Yup.string().email('O e-mail é inválido.').required('O e-mail é obrigátorio.'),
      password: Yup.string().required('A senha é obrigatória.').min(6),
      role: Yup.number()
    })

    await schema.validate(req.body).catch((err) => {
      return res.status(400).json(err)
    })

    const userExists = await User.findOne({ where: { email: req.body.email } })

    if (userExists) {
      return res.status(400).json({ errors: ['Já existe um usuário utilizando esse e-mail.'] })
    }

    const { id, firstname, lastname, email, role } = await User.create(req.body)
    const returnUser = { id, firstname, lastname, email, role }
    return res.status(201).json({ msg: 'Usuário cadastrado com sucesso!', return: returnUser })
  }

  async index (req, res) {
    const limit = 20
    let offset = 0
    await User.findAndCountAll()
      .then((data) => {
        const page = req.query.page ? req.query.page : 1
        const pages = Math.ceil(data.count / limit)
        offset = limit * (page - 1)
        User.findAll({
          attributes: ['id', 'firstname', 'lastname', 'email', 'role', 'created_at', 'updated_at', 'deleted_at'],
          limit,
          offset,
          order: [
            ['created_at', 'DESC']
          ]
        })
          .then((users) => {
            res.status(200).json({
              data: users,
              total: data.count,
              current_page: Number(page),
              per_page: limit,
              last_page: pages
            })
          })
      })
      .catch(() => {
        res.status(500).send({ erros: ['Estamos enfrentando instabilidades no momento, tente novamente mais tarde.'] })
      })
  }

  async show (req, res) {
    const { id } = req.params
    const user = await User.findOne({ where: { id: Number(id) } })

    res.status(200).json(user)
  }

  async update (req, res) {
    const schema = Yup.object().shape({
      firstname: Yup.string(),
      lastname: Yup.string(),
      email: Yup.string().email('O e-mail deve ser válido.'),
      oldPassword: Yup.string().min(6),

      password: Yup.string().min(6)
        .when('oldPassword', (oldPassword, field) => {
          return oldPassword ? field.required() : field
        }),
      confirmPassword: Yup.string()
        .when('password', (password, field) => {
          return password ? field.required().oneOf([Yup.ref('password')]) : field
        })
    })

    await schema.validate(req.body).catch((err) => {
      return res.status(400).json(err)
    })

    const { email, oldPassword } = req.body

    const user = await User.findByPk(req.userId)
    if (email && email !== user.email) {
      const userExists = await User.findOne({ where: { email } })

      if (userExists) {
        return res.status(400).json({ errors: ['O usuário já existe.'] })
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ errors: ['Senha não corresponde.'] })
    }
    const { id, firstname, lastname, role } = await user.update(req.body)

    return res.status(200).json({ id, firstname, lastname, email, role })
  }

  async delete (req, res) {
    const { id } = req.params

    await User.destroy({ where: { id: Number(id) } })
    return res.status(200).json({ msg: `O usuário de id: ${id}, foi deletada com sucesso` })
  }
}

export default new UserController()
