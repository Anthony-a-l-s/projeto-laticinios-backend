import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'
import { AppError } from "../../shared/errors/AppErrors";
const knex = require('../../shared/infra/knex/connection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//Tipo de retorno da funcao abaixo
interface IResponse {
    token: string
    perfil: string
    email: string
    user: []
}

module.exports = {

    async perfilCreation(request: Request, res: Response, next: any) {
        const { name } = request.body
        const { loginId, userId } = request.params

         //Verificando se o perfil existe
         let ifNameExist = await knex.select('name').from('Entity').where({ name: name, userId: userId })

         //Messagem de erro caso nao existe
         if (!ifNameExist) {
                 
             throw new AppError("Esse perfil nao existe");
         }
 
         //Pegando email do usuario
         const userEmail = await knex.select('email').from('login').where({ loginId })
 
         ///Pegando as informacoes do usuario logado
         const usuario = await knex('users').where({ userId: userId })

         //Criando o token de authenticacao
         const token = sign({userId: userId, perfil: name}, "f968930f67be264f2c1bfb80adf27ba7", {
             expiresIn: "1d"
         });

         request.user = {
             id: userId
         }

         console.log(request.user)
        //Retornando o token, o perfil do usuario logado e as informacoes daquele usuario
        const tokenReturn: IResponse = {
            token,
            perfil: name,
            email: userEmail,
            user: usuario
        }
        return res.status(200).json(tokenReturn);
    }

}