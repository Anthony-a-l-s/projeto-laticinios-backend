import { Request, Response } from "express";
const knex = require('../../infra/knex/connection');

module.exports = {
    async index(req: Request, res: Response) {


        const result = await knex('pda_ref_table')

        return res.json(result)

    },

    async umPdaRefTable(req: Request, res: Response) {
        const { pdaRefTableId } = req.params

        const result = await knex('pda_ref_table').where({ id: pdaRefTableId })

        return res.json(result)

    },

    async create(req: Request, res: Response, next: any) {

        try {
            const {id, pda } = req.body
            console.log(id, pda)
            await knex('pda_ref_table').insert({
                id,
                pda
            })
            const pdaRefTable = {
                id,
                pda
            }
            return res.status(201).json(pdaRefTable)
        } catch (error) {
            next(error)
        }
    },

    async update(req: Request, res: Response, next: any) {
        try {
            const { id, pda } = req.body
            const { pdaRefTableId } = req.params
            await knex('pda_ref_table')
                .update({
                    id,
                    pda
                })
                .where({ id: pdaRefTableId })
            return res.status(200).json("ref PDA editado com sucesso!")
        } catch (error) {
            next(error)
        }
    },

    async delete(req: Request, res: Response, next: any) {

        try {
            const { pdaRefTableId } = req.params
            await knex('pda_ref_table')
                .where({ id: pdaRefTableId })
                .del()

            return res.status(200).json("ref PDA excluído com sucesso!")
        } catch (error) {
            next(error)
        }
    },
}