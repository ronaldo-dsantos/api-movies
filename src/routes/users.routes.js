const { Router } = require("express") // Importando o Router de dentro do próprio express

const UsersControllers = require("../controllers/UsersController")// Importando o arquivo UsersController

const usersRoutes = Router() // Inicializando o Router do express

const usersControllers = new UsersControllers() 

usersRoutes.post("/", usersControllers.create) // Ao ser acessada a rota de usuários, está direcionando para a classe usersController e acessando o método create
usersRoutes.put("/:id", usersControllers.update) // Rota de usuários acessada pelo método put, pegando um id por parametro e acessando o método update

module.exports = usersRoutes 