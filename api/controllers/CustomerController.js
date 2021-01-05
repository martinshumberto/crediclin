import Customer from '../models/Customer'

class CustomerController {
  async store (req, res) {
  }

  async index (req, res) {
    const customer = await Customer.findAll()
    res.status(200).json(customer)
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
