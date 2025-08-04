const ContactsRepository = require('../repositories/ContactsRepository')

class ContactController {
  async index(request, response) {
    // listar todos os registros
    const contacts = await ContactsRepository.findAll()

    return response.json(contacts)
  }

  async show(request, response) {
    // obter um registro
    const { id } = request.params

    const contact = await ContactsRepository.findById(id)

    if (!contact) {
      return response.status(404).json({ error: 'User not found!' })
    }

    return response.json(contact)
  }

  store() {
    // criar novo registro
  }

  update() {
    // editar um registro
  }

  async delete(request, response) {
    // deletar um registro
    const { id } = request.params

    const contact = await ContactsRepository.findById(id)

    if (!contact) {
      return response.status(404).json({ error: 'User not found!' })
    }

    await ContactsRepository.delete(id)

    return response.status(204).send()
  }
}

// Singleton: usar a mesma classe armazenada em memoria
module.exports = new ContactController()
