const { randomUUID } = require('node:crypto')

const db = require('../../database')

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
  async findAll() {
    const rows = await db.query('SELECT * FROM contacts')
    return rows
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM contacts WHERE id = $1', [id])
    return row
  }

  async findByEmail(email) {
    const [row] = await db.query('SELECT * FROM contacts WHERE email = $1', [email])
    return row
  }

  async create({ name, email, phone, category_id }) {
    // SQL Injection - Injeção de SQL, permite com que o usuário force erros
    const [row] = await db.query(`
      INSERT INTO contacts(name, email, phone, category_id)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `, [name, email, phone, category_id])

    return row
  }

  update(id, { name, email, phone, category_id }) {
    return new Promise((resolve) => {
      const updatedContact = {
        id,
        name,
        email,
        phone,
        category_id
      }

      contacts = contacts.map((contact) => (
        contact.id === id ? updatedContact : contact
      ))

      resolve(updatedContact)
    })
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id)
      resolve()
    })
  }
}

module.exports = new ContactsRepository()
