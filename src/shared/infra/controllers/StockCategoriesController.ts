import { Request, Response } from "express";
const knex = require('../../infra/knex/connection');

module.exports = {
    //funcao para pegar todos os checklist
    async index(req: Request, res: Response) {


        const result = await knex('sotck_category')

        return res.json(result)

    },

    //funcao para pegar os dados de um checklist dado o id dele
    async UmStockCategory(req: Request, res: Response) {
        const { stockCategoryId } = req.params

        const result = await knex('sotck_category').where({ id: stockCategoryId  })

        return res.json(result)

    },


    //funcao para criar um checklist
    async create(req: Request, res: Response, next: any) {
        try {
            const {
                id,
                nome
            } = req.body

            await knex('sotck_category').insert({
                id,
                nome
            })
            const sotck_category = {
                id,
                nome
            }
            return res.status(201).json(sotck_category)
        } catch (error) {
            next(error)
        }
    },


    //funcao para atualizar um checklist
    async update(req: Request, res: Response, next: any) {
        try {
            const { 
                id,
                nome
            } = req.body
            const { stockCategoryId } = req.params
            await knex('sotck_category')
                .update({
                    id,
                    nome
                })
                .where({ id: stockCategoryId })
            return res.status(200).json('Categoria de estoque editado com sucesso')
        } catch (error) {
            next(error)
        }
    },

    //funcao para apagar um checklist
    async delete(req: Request, res: Response, next: any) {

        try {
            const { stockCategoryId } = req.params

            await knex('sotck_category')
                .where({ id: stockCategoryId })
                .del()

            return res.status(200).json('Categoria de estoque excluido com sucesso')
        } catch (error) {
            next(error)
        }
    },

}