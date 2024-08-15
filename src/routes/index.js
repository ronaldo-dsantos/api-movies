const { Router } = require("express") // Importando o Router do express

const usersRouter = require("./users.routes") // Importando o arquivo de rotas
const notesRouter = require("./notes.routes") // Importando o arquivo de rotas
const tagsRouter = require("./tags.routes")
const sessionsRouter = require("./sessions.routes")

const routes = Router() // Inicializando o Router do express

routes.use("/users", usersRouter) // Recebendo a rota users e direcionando para o  usersRouter que é onde está o grupo de rotas do usuário
routes.use("/notes", notesRouter)
routes.use("/tags", tagsRouter)
routes.use("/sessions", sessionsRouter)

module.exports = routes // Exportando o routes, o routes contém todos os grupos de rota de nossa aplicação

