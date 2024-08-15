const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class NotesController {
  async create(request, response) {
    const { title, description, rating, tags } = request.body
    const { user_id } = request.params

    const ratingIsNumber = Math.round(rating)

    if (ratingIsNumber < 1 || ratingIsNumber > 5 || isNaN(ratingIsNumber)) {
      throw new AppError("Informe uma nota de 1 a 5.")      
    }  
    
    const [ note_id ] = await knex("notes").insert({ // Inserindo a nota no banco de dados e armazenando o note_id da nota criada, estamos colocando ele dentro de um array porque o knex está devolvendo o note_id dentro de um array
      title,
      description,
      rating: ratingIsNumber,
      user_id
    })

    const tagsInsert = tags.map(name => { 
      return {
        note_id,
        user_id,
        name
      }
    })

    await knex("tags").insert(tagsInsert) 

    return response.json()
  }

  async show(request, response) {
    const { id } = request.params

    const note = await knex("notes").where({ id }).first() 
    const tags = await knex("tags").where({ note_id: id }).orderBy("name") 

    return response.json({ 
      ...note,
      tags
    })
  }

  async delete(request, response) {
    const { id } = request.params

    await knex("notes").where({ id }).delete() 

    return response.json()
  }

  async index(request, response) {
    const { title, tags } = request.query
    const user_id = request.user.id

    let notes

    if (tags) { // Se foi informado uma tag faça a busca por tag
      const filterTags = tags.split(',').map(tag => tag) // convertendo a tags de um texto simples para um vetor, realizado um map para pegar só a tag
      
      notes = await knex("tags")
      .select([
        "notes.id",
        "notes.title",
        "notes.user_id"
      ])
      .where("notes.user_id", user_id)
      .whereLike("notes.title", `%${title}%`)
      .whereIn("name", filterTags) // Busque na tabela notes e compare os nomes com os nomes informados no vetor
      .innerJoin("notes", "notes.id", "tags.note_id") // Realizando busca em duas tabelas usando o innerJoin
      .orderBy("notes.title")

    } else { 
      notes = await knex("notes")
      .where({ user_id, })
      .whereLike("title", `%${title}%`)
      .orderBy("title") // Busque na tabela notes onde o user id seja igual ao informado e onde o titulo contenha a palavra informada e ordene por título
    }

    const userTags = await knex("tags").where({ user_id }) // Buscando na tabela tags as tags que pertencem ao user_id informado
    const notesWithTags = notes.map(note => { // Juntando as notas e as tags
    const noteTags = userTags.filter(tag => tag.note_id === note.id)
      
      return {
        ...note,
        tags: noteTags
      }
    })

    return response.json(notesWithTags)
  }
}

module.exports = NotesController