import Customer from '../models/Customer'

class CustomerController {
  async store (req, res) {
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
          $sort: { id: 1 }
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
