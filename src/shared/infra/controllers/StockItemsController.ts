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
        const result = await knex('stock_items').where({categoria: stockCategoryId })

        return res.json(result)

    },

    async UmStockItem(req: Request, res: Response) {
        const { stockItemId } = req.params

        const result = await knex('stock_items').where({ id: stockItemId })

        return res.json(result)

    },


    //funcao para criar um checklist
    async create(req: Request, res: Response, next: any) {
        console.log("laaaaaaço do passarinheiro")
        try {
            const {
                nome,
                fornecedor,
                lote,
                quantidade,
                validade,
                info, 
                dataFormatada,
                categoria,
            } = req.body

            console.log(nome + ' ' +
                fornecedor +  ' ' +
                lote + ' ' +
                quantidade + ' ' +
                validade + ' ' +
                info + ' ' +   
                dataFormatada + ' ' +
                categoria + ' ' )

            await knex('stock_items').insert({
                nome,
                fornecedor,
                lote,
                quantidade,
                validade: validade.slice(0, 10),
                info, 
                dataFormatada,
                categoria,
            })
            const stock_items = {
                nome,
                fornecedor,
                lote,
                quantidade,
                validade,
                info, 
                dataFormatada,
                categoria,
            }
            return res.status(201).json(stock_items)
        } catch (error) {
            console.log(error)
            next(error)
        }
    },


    //funcao para atualizar um checklist
    async update(req: Request, res: Response, next: any) {
        try {
            const { 
                nome,
                fornecedor,
                lote,
                quantidade,
                validade,
                info, 
                dataFormatada,
                categoria,
            } = req.body
            const { stockItemId } = req.params
            await knex('stock_items')
                .update({
                    nome,
                    fornecedor,
                    lote,
                    quantidade,
                    validade,
                    info, 
                    dataFormatada,
                    categoria,

                })
                .where({ id: stockItemId })
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
                .where({ id: stockItemId })
                .del()

            return res.status(200).json('Item de estoque excluido com sucesso')
        } catch (error) {
            next(error)
        }
    },

}