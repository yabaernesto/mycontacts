class ContactController {
  index(request, response) {
    // listar todos os registros
    response.send('Send from contact controller!')
  }

  show() {
    // obter um registro
  }

  store() {
    // criar novo registro
  }

  update() {
    // editar um registro
  }

  delete() {
    // deletar um registro
  }
}

// Singleton: usar a mesma classe armazenada em memoria
module.exports = new ContactController()
