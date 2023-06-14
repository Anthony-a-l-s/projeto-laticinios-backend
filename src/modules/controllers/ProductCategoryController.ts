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
        const result = await knex('productCategory')

        return res.json(result)
    },

        //funcao para pegar cadastrar um productCategory
    async create(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {
            const { name } = req.body
            
            await knex('productCategory')
            .create({ name })

            return res.status(201).send()

        } catch(error) {
            next(error)
        }
    },

        //funcao para atualizar um productCategory cadastrado
    async update(req: Request, res: Response, next: any) {
        try {

            const { name } = req.body
            const { productcategoryId } = req.params

            await knex('productCategory')
            .update({ name })
            .where({ productcategoryId })

            return res.send()

        } catch(error) {
            next(error)
        }
    },


        //funcao para apagar um productCategory
    async delete(req: Request, res: Response, next: any) {
        try {
            const { productcategoryId } = req.body

            await knex('productCategory')
            .where({ productcategoryId })
            .del()

            return res.send()
        } catch(error) {
            next(error)
        }
    }

}