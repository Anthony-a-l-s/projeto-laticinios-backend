import { Request, Response } from 'express';

const knex = require('../../shared/infra/knex/connection')

module.exports = {

        //funcao para pegar todos os categoria de produto cadastrados
    async index(req: Request, res: Response) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        const result = await knex('productProvider')

        return res.json(result)
    },

        //funcao para pegar cadastrar um productProvider
    async create(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {
            const { name, identificationDocument } = req.body
            
            await knex('productProvider')
            .create({ name,identificationDocument })

            return res.status(201).send()

        } catch(error) {
            next(error)
        }
    },

        //funcao para atualizar um productProvider cadastrado
    async update(req: Request, res: Response, next: any) {
        try {

            const { name, identificationDocument } = req.body
            const { productProviderId } = req.params

            await knex('productProvider')
            .update({ name, identificationDocument })
            .where({ productProviderId })

            return res.send()

        } catch(error) {
            next(error)
        }
    },


        //funcao para apagar um productProvider
    async delete(req: Request, res: Response, next: any) {
        try {
            const { productProviderId } = req.body

            await knex('productProvider')
            .where({ productProviderId })
            .del()

            return res.send()
        } catch(error) {
            next(error)
        }
    }

}