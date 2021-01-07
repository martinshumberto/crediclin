import jwt from 'jsonwebtoken'
import * as Yup from 'yup'
import User from '../models/User'

class SessionUserController {
  async store (req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required('O e-mail é obrigatório.'),
      password: Yup.string().required('A senha é obrigatória.')
    })

    await schema.validate(req.body).catch((err) => {
      return res.status(400).json(err)
    })

    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      return res.status(401).json({ errors: ['O usuário não foi encontrado.'] })
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ errors: ['A senha está incorreta.'] })
    }

    const { id, firstname, lastname } = user

    return res.send({
      user: {
        id,
        firstname,
        lastname,
        email
      },
      token: jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_LIFE
      })
    })
  }

  async show (req, res) {
    const id = req.userId
    const user = await User.findOne({ where: { id: Number(id) } })

    res.status(200).json(user)
  }
}

export default new SessionUserController()
