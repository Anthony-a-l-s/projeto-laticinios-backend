import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'
import { AppError } from "../../errors/AppErrors";
const knex = require('../knex/connection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');
require('dotenv').config

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
        const token = sign({ userId: userId, perfil: name }, "f968930f67be264f2c1bfb80adf27ba7", {
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
    },

    //funcao para listar todos os usuarios cadastrados 
    async index(req: Request, res: Response) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        const result = await knex('profiles')

        return res.json(result)

    },
    async oneProfile(req: Request, res: Response) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        const { profileId } = req.params
        const result = await knex('profiles').where({ id_profile: profileId })

        return res.json(result)

    },
    async profilesByUser(req: Request, res: Response) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        const { userId } = req.params
        const result = await knex('profiles').where({ user_id: userId })

        return res.json(result)

    },


    //funcao de cadastro de usuario
    async create(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {
            const {type, cnpj, address, register_number, function_id, active } = req.body
            const { userId } = req.params
            console.log('Esse é o id ó: ')
            console.log(userId)
            const id = uuidv4();
            await knex('profiles').insert({
                id: id,
                type,
                cnpj,
                address,
                register_number,
                function_id,
                active,
                user_id: userId
            })
            const profile = {
                id,
                type,
                cnpj,
                address,
                register_number,
                function_id,
                active,
                userId
            }
            return res.status(201).json(profile)
        } catch (error) {
            console.log(error)
            next(error)
        }
    },

    async getToken(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {
            const { profileId }  = req.params
            const profile = await knex('profiles').where({ id: profileId })
            //const jwtPayload = { admin: profile[0].type}
            const token = sign({ userId: profile[0].user_id, perfil: profile[0].type }, "f968930f67be264f2c1bfb80adf27ba7", {
                expiresIn: "1d"
            });
            return res.status(201).json(token)
        } catch (error) {
            next(error)
        }
    },

    //funcao para atualizar os dados dum usuario cadasrtrado
    async update(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {
            const { cnpj, address, register_number, function_id } = req.body
            const { profileId } = req.params
            await knex('profiles')
                .update({
                    cnpj,
                    address,
                    register_number,
                    function_id
                })
                .where({ id_profile: profileId })

            return res.status(200).json('Perfil editado com sucesso')
        } catch (error) {
            next(error)
        }
    },


    //Funcao para excluir um usuario
    async delete(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {
            const { profileId } = req.params
            await knex('profiles')
                .where({ id: profileId })
                .del()

            return res.status(200).json('Perfil excluído com sucesso')
        } catch (error) {
            next(error)
        }
    },

}