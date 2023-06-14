import { Request, Response } from 'express';

const knex = require('../../shared/infra/knex/connection')

module.exports = {

        //funcao para pegar todos os acessos cadastrados
    async index(req: Request, res: Response) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        const result = await knex('acess')

        return res.json(result)
    },

        //funcao para pegar cadastrar um acesso
    async create(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {
            
            const { TimestampLogin, TimestampLogout, ip, latitude, longitude } = req.body
            const { userId } = req.params
            
            await knex('acess')
            .create({ TimestampLogin, TimestampLogout, ip, latitude, longitude })
            .where({ userId })

            return res.status(201).send()

        } catch(error) {
            next(error)
        }
    },

        //funcao para pegar atualizar um acesso cadastrado
    async update(req: Request, res: Response, next: any) {
        try {

            const { TimestampLogin, TimestampLogout, ip, latitude, longitude } = req.body
            const { userId } = req.body

            await knex('acess')
            .update({ TimestampLogin, TimestampLogout, ip, latitude, longitude })
            .where({ userId })

            return res.send()

        } catch(error) {
            next(error)
        }
    },


        //funcao para apagar um acesso
    async delete(req: Request, res: Response, next: any) {
        try {
            const { acessId } = req.body

            await knex('acess')
            .where({ acessId })
            .del()

            return res.send()
        } catch(error) {
            next(error)
        }
    }

}