import { Request, Response } from "express";
const knex = require('../../infra/knex/connection');

module.exports = {
    //funcao para pegar todos os checklist
    async index(req: Request, res: Response) {


        const result = await knex('stock_items')

        return res.json(result)

    },

    //funcao para pegar os dados de um checklist dado o id dele
    async stockItemByCategory(req: Request, res: Response) {
        const { stockCategoryId } = req.params
         console.log(stockCategoryId)
        const result = await knex('stock_items').where({id_sotck_category: stockCategoryId })

        return res.json(result)

    },

    async UmStockItem(req: Request, res: Response) {
        const { stockItemId } = req.params

        const result = await knex('stock_items').where({ id_stock_item: stockItemId })

        return res.json(result)

    },


    //funcao para criar um checklist
    async create(req: Request, res: Response, next: any) {
        try {
            const {
                name,
                supplier,
                batch,
                amount,
                validity,
                info,
                formatted_date,
                id_sotck_category
            } = req.body

            await knex('stock_items').insert({
                name,
                supplier,
                batch,
                amount,
                validity,
                info,
                formatted_date,
                id_sotck_category
            })
            const stock_items = {
                name,
                supplier,
                batch,
                amount,
                validity,
                info,
                formatted_date,
                id_sotck_category
            }
            return res.status(201).json(stock_items)
        } catch (error) {
            next(error)
        }
    },


    //funcao para atualizar um checklist
    async update(req: Request, res: Response, next: any) {
        try {
            const { 
                name,
                supplier,
                batch,
                amount,
                validity,
                info,
                formatted_date
            } = req.body
            const { stockItemId } = req.params
            await knex('stock_items')
                .update({
                    name,
                    supplier,
                    batch,
                    amount,
                    validity,
                    info,
                    formatted_date

                })
                .where({ id_stock_item: stockItemId })
            return res.status(200).json('Item de estoque editado com sucesso')
        } catch (error) {
            next(error)
        }
    },

    //funcao para apagar um checklist
    async delete(req: Request, res: Response, next: any) {

        try {
            const { stockItemId } = req.params

            await knex('stock_items')
                .where({ id_stock_item: stockItemId })
                .del()

            return res.status(200).json('Item de estoque excluido com sucesso')
        } catch (error) {
            next(error)
        }
    },

}