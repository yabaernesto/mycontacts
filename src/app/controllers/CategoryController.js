const CategoriesRepository = require('./../repositories/CategoriesRepository')

class CategoryController {
  async index(request, response) {
    const categories = await CategoriesRepository.findAll()

    return response.json(categories)
  }

  async show(request, response) {
    const { id } = request.params

    const category = await CategoriesRepository.findById(id)

    if (!category) {
      return response.status(404).json({ error: 'Category not found!' })
    }

    return response.json(category)
  }

  async store(request, response) {
    const { name } = request.body

    if (!name) {
      return response.status(400).json({ error: 'Name is required!' })
    }

    const categoryExists = await CategoriesRepository.findByCategory(name)

    if (categoryExists) {
      return response.status(400).json({ error: 'Category is already in use' })
    }

    const category = await CategoriesRepository.create({ name })

    return response.json(category)
  }

  async update(request, response) {
    const { id } = request.params
    const { name } = request.body

    const categoryExists = await CategoriesRepository.findById(id)

    if (!categoryExists) {
      return response.status(404).json({ error: 'Category not found!' })
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required!' })
    }

    const nameAlreadyExists = await CategoriesRepository.findByCategory(name)

    if (nameAlreadyExists && nameAlreadyExists.id === id) {
      return response.status(400).json({ error: 'Category name already in use!' })
    }

    const category = await CategoriesRepository.update(id, { name })

    return response.json(category)
  }

  async delete(request, response) {
    const { id } = request.params

    const category = await CategoriesRepository.findById(id)

    if (!category) {
      return response.status(404).json({ error: 'Category not found!' })
    }

    await CategoriesRepository.delete(id)

    return response.status(204).send()
  }
}

module.exports = new CategoryController()
