import { Request, Response } from "express";
const knex = require('../../shared/infra/knex/connection');

module.exports = {

            //funcao para listar todos os usuarios cadastrados 
    async index(req: Request, res: Response) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        const result = await knex('users')

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
            const { name, hasCompany,active, registro } = req.body
            const { loginId } = req.params


            await knex('users').insert({
                name,
                hasCompany,
                active, 
                registro,
                loginId
            }).where({ loginId })
            return res.status(201).send()
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
            const { name, hasCompany,active, registro } = req.body
            const { userId } = req.params

            await knex('users')
                .update({
                    name,
                    hasCompany,
                    active, 
                    registro
                })
                .where({ userId })

            return res.status(200).send()
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
            const { userId } = req.params

            await knex('users')
                .where({ userId })
                .del()

            return res.send()
        } catch (error) {
            next(error)
        }
    },

}