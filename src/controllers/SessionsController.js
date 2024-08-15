const knex = require("../database/knex")
const AppError = require("../utils/AppError")

const { compare } = require("bcrypt")
const authConfig = require("../configs/auth")
const { Sign, sign } = require("jsonwebtoken")
const { use } = require("express/lib/router")


class SessionsController {
  async create(request, response) {
    const { email, password } = request.body

    const user = await knex("users").where({ email }).first()

    if (!user) {
      throw new AppError("E-mail e/ou senha incorreta", 401)
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError("E-mail e/ou senha incorreta", 401)
    }

    const { secret, expiresIn } = authConfig.jwt
    const token = sign({}, secret, { //criando o token de autenticação
      subject: String(user.id),
      expiresIn
    })

    return response.json({ user, token })
  }
}

module.exports = SessionsController