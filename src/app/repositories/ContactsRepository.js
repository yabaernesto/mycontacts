const { randomUUID } = require('node:crypto')

let contacts = [
  {
    id: randomUUID(),
    name: 'Yaba',
    email: 'yaba@email.co.ao',
    phone: '123456789',
    category_id: randomUUID(),
  },
  {
    id: randomUUID(),
    name: 'Ernesto',
    email: 'ernesto@email.co.ao',
    phone: '0011001100',
    category_id: randomUUID(),
  },
]

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(contacts)
    })
  }

  async findById(id) {
    return new Promise((resolve) => resolve(
      contacts.find((contact) => contact.id === id)
    ))
  }

  async delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id)
      resolve()
    })
  }
}

module.exports = new ContactsRepository()
