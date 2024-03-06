import { Request, Response } from "express";
const knex = require('../../infra/knex/connection');

module.exports = {
    async index(req: Request, res: Response) {


        const result = await knex('pda_ref_tables')

        return res.json(result)

    },

    async umPdaRefTable(req: Request, res: Response) {
        const { pdaRefTableId } = req.params

        const result = await knex('pda_ref_tables').where({ id: pdaRefTableId })

        return res.json(result)

    },

    async create(req: Request, res: Response, next: any) {

        try {
            const { pda } = req.body
            await knex('pda_ref_tables').insert({
                pda
            })
            const pdaRefTable = {
                pda
            }
            return res.status(201).json(pdaRefTable)
        } catch (error) {
            next(error)
        }
    },

    async update(req: Request, res: Response, next: any) {
        try {
            const { pda } = req.body
            const { pdaRefTableId } = req.params
            await knex('pda_ref_tables')
                .update({
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
            await knex('pda_ref_tables')
                .where({ id: pdaRefTableId })
                .del()

            return res.status(200).json("ref PDA excluído com sucesso!")
        } catch (error) {
            next(error)
        }
    },
}