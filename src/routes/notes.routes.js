const { Router } = require("express")

const NotesControllers = require("../controllers/NotesController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const notesRoutes = Router()

const notesControllers = new NotesControllers()

notesRoutes.use(ensureAuthenticated) // Aplicando o middleware para todas as rotas

notesRoutes.post("/", notesControllers.create)
notesRoutes.get("/:id", notesControllers.show)
notesRoutes.delete("/:id", notesControllers.delete)
notesRoutes.get("/", notesControllers.index)

module.exports = notesRoutes 