import { Request, Response } from 'express';

const knex = require('../../shared/infra/knex/connection')

module.exports = {

        //funcao para pegar todas as entidades cadastrado
    async index(req: Request, res: Response) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        const result = await knex('Entity')

        return res.json(result)
    },

        //funcao para cadastrar uma entidade
    async create(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {
            
            const { name } = req.body
            const { userId } = req.params
            
            await knex('Entity')
            .insert({ name, userId })
            

            return res.status(201).send()

        } catch(error) {
            next(error)
        }
    },

    //funcao para atualizar uma entidade cadastrado
    async update(req: Request, res: Response, next: any) {
        try {

            const { name } = req.body
            const { entityId } = req.params

            await knex('Entity')
            .update({ name })
            .where({ entityId })

            return res.send()

        } catch(error) {
            next(error)
        }
    },

    //funcao para deletar uma entidade cadastrado
    async delete(req: Request, res: Response, next: any) {
        try {
            const { entityId } = req.params

            await knex('Entity')
            .where({ entityId })
            .del()

            return res.send()
        } catch(error) {
            next(error)
        }
    }

}