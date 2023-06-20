import { Request, Response } from "express";
const knex = require('../../infra/knex/connection');

module.exports = {
    async index(req: Request, res: Response) {


        const result = await knex('pda_tables')

        return res.json(result)

    },

    async UmPdaTable(req: Request, res: Response) {
        const { id } = req.params

        const result = await knex('pda_tables').where({ id })

        return res.json(result)

    },

    async create(req: Request, res: Response, next: any) {

        try {
            const { pda_ref_table_id } = req.params
            const { respomsible, funct } = req.body
            await knex('pda_tables').insert({
                respomsible,
                funct,
                pda_ref_table_id,
            })
            const pdaTable = {
                respomsible,
                funct,
                pda_ref_table_id
            }
            return res.status(201).json(pdaTable)
        } catch (error) {
            next(error)
        }
    },

    async update(req: Request, res: Response, next: any) {
        try {
            const { respomsible,funct} = req.body
            const { id } = req.params
            await knex('pda_tables')
                .update({
                    respomsible,
                    funct,
                })
                .where({ id })
            return res.status(200).send()
        } catch (error) {
            next(error)
        }
    },

    async delete(req: Request, res: Response, next: any) {

        try {
            const { id } = req.params
            await knex('pda_tables')
                .where({ id })
                .del()

            return res.send()
        } catch (error) {
            next(error)
        }
    },
}