import * as Yup from 'yup'
import Customer from '../models/Customer'

class CustomerController {
  async store (req, res) {
    const schema = Yup.object().shape({
      firstname: Yup.string().required('O primeiro nome é obrigátorio.'),
      lastname: Yup.string().required('O sobrenome é obrigátorio.'),
      email: Yup.string().email('O e-mail é inválido.').required('O e-mail é obrigátorio.'),
      phone: Yup.string(),
      cell: Yup.string().required('O celular é obrigátorio.').min(9),
      cpf: Yup.string().min(11),
      rg: Yup.string(),
      rg_issue_date: Yup.date(),
      rg_organ_emitter: Yup.string(),
      birth: Yup.date(),
      cep: Yup.string().min(8),
      address: Yup.string(),
      complement: Yup.string(),
      number: Yup.string(),
      neighborhood: Yup.string(),
      city: Yup.string(),
      state: Yup.string()
    })

    // if (!(await schema.isValid(req.body))) {
    //   return res.status(401).json({ error: 'Algo deu errado na validação.' })
    // }

    await schema.validate(req.body).catch((err) => {
      return res.status(400).json(err)
    })

    const userExists = await Customer.findOne({ where: { email: req.body.email } })

    if (userExists) {
      return res.status(400).json({ error: 'Já existe um usuário utilizando esse e-mail.' })
    }

    const returnCustomer = await Customer.create(req.body)
    return res.status(201).json({ return: returnCustomer, msg: 'Cliente cadastrado com sucesso!' })
  }

  async index (req, res) {
    const limit = 20
    let offset = 0
    await Customer.findAndCountAll()
      .then((data) => {
        const page = req.query.page ? req.query.page : 1
        const pages = Math.ceil(data.count / limit)
        offset = limit * (page - 1)
        Customer.findAll({
          attributes: {
            include: ['created_at', 'updated_at', 'deleted_at']
          },
          limit,
          offset,
          order: [
            ['created_at', 'DESC']
          ]
        })
          .then((customers) => {
            res.status(200).json({
              data: customers,
              total: data.count,
              current_page: Number(page),
              per_page: limit,
              last_page: pages
            })
          })
      })
      .catch(() => {
        res.status(500).send('Internal Server Error')
      })
  }

  async show (req, res) {
    const { id } = req.params
    const user = await Customer.findOne({ where: { id: Number(id) } })

    res.status(200).json(user)
  }

  async update (req, res) {
  }

  async delete (req, res) {
    const { id } = req.params

    await Customer.destroy({ where: { id: Number(id) } })
    return res.status(200).json(`O cliente de id: ${id} foi deletada com sucesso`)
  }
}

export default new CustomerController()
