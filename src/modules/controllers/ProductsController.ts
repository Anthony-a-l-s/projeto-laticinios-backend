import { Request, Response } from 'express';

const knex = require('../../shared/infra/knex/connection')

module.exports = {

        //funcao para pegar todos os produtos cadastrados
    async index(req: Request, res: Response) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        const result = await knex('products')

        return res.json(result)
    },

        //funcao para pegar cadastrar um produto
    async create(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {
            const { productName, productCode, productlabel, startOfManufacture, endOfManufacture} = req.body
            const { productProviderId, productCategoryId } = req.params

            await knex('products')
            .create({ productName, productCode, productlabel, startOfManufacture, endOfManufacture })
            .where({ productProviderId, productCategoryId })

            return res.status(201).send()

        } catch(error) {
            next(error)
        }
    },

        //funcao para atualizar um produto cadastrado
    async update(req: Request, res: Response, next: any) {
        try {

            const { productName, productCode, productlabel, startOfManufacture, endOfManufacture } = req.body
            const { productId } = req.params

            await knex('products')
            .update({ productName, productCode, productlabel, startOfManufacture, endOfManufacture })
            .where({ productId })

            return res.send()

        } catch(error) {
            next(error)
        }
    },


        //funcao para apagar um produto
    async delete(req: Request, res: Response, next: any) {
        try {
            const { productId } = req.body

            await knex('products')
            .where({ productId })
            .del()

            return res.send()
        } catch(error) {
            next(error)
        }
    }

}