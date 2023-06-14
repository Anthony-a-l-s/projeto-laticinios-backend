import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'
import { AppError } from "../../shared/errors/AppErrors";
const knex = require('../../shared/infra/knex/connection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

interface IResponse {
    loginId: string
    userId: string
    perfils: []
}

module.exports = {

    async authentication(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        const { email, password } = req.body

        //Verificando se o endereco email existe
        let ifEmailExist = await knex.select('email').from('login').where({ email })

        if (!ifEmailExist) {
                
            throw new AppError("Incorrect email or password");
        }

        // Comparando a senha digitada com a senha no banco
        let passwordToCompare = await knex.select('password').from('login').where({ email })

        const passwordMatch = await bcrypt.compare(password, passwordToCompare[0].password)

        if (!passwordMatch) {
                
            throw new AppError("Incorrect email or password");
        }

        //Pegando o Id do login
        const loginId = await knex.select('loginId').from('login').where({ email })
        console.log(loginId)
        //Pegando o id do usuario ligado a esse login
        const userId = await knex.select('userId').from('users').where({loginId: loginId[0].loginId})
        console.log(userId)

        const perfils = await knex.select('name').from('Entity').where({ userId: userId[0].userId })
        console.log(perfils)

        //retornando a lista desses usuarios e o id do login
        const userInfoReturn: IResponse = {
            loginId,
            userId,
            perfils        
        }
        return res.status(200).json(userInfoReturn);
    }

}