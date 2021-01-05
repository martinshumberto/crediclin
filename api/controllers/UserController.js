import * as Yup from 'yup'
import User from '../models/User'

class UserController {
  async store (req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6)
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' })
    }

    const userExists = await User.findOne({ where: { email: req.body.email } })

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' })
    }

    // const user = await User.create(req.body)
    // return res.status(200).json(user);
    const { id, name, email, role } = await User.create(req.body)

    return res.status(201).json({ id, name, email, role })
  }

  async index (req, res) {
    const user = await User.findAll()

    res.status(200).json(user)
  }

  async show (req, res) {
    const { id } = req.params
    const user = await User.findOne({ where: { id: Number(id) } })

    res.status(200).json(user)
  }

  async update (req, res) {
    // Validando os dados com o yup
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
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

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' })
    }

    const { email, oldPassword } = req.body

    const user = await User.findByPk(req.userId)
    if (email && email !== user.email) {
      const userExists = await User.findOne({ where: { email } })

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' })
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' })
    }
    const { id, name, role } = await user.update(req.body)

    return res.status(200).json({ id, name, email, role })
  }

  async delete (req, res) {
    const { id } = req.params

    await User.destroy({ where: { id: Number(id) } })
    return res.status(200).json(`O Usuário de id: ${id} foi deletada com sucesso`)
  }
}

export default new UserController()
