const { Router } = require("express") // Importando o Router de dentro do próprio express

const UsersControllers = require("../controllers/UsersController")// Importando o arquivo UsersController

const usersRoutes = Router() // Inicializando o Router do express

const usersControllers = new UsersControllers() // Instanciando o UsersControllers, como ele é uma classe, precisamos alocar ele na memória para que póssamos utilizá-la

usersRoutes.post("/", usersControllers.create) // Ao ser acessada a rota de usuários, está direcionando para a classe usersController e acessando o método create

module.exports = usersRoutes // Exportando o usersRoutes para que o server.js possa utilizá-lo