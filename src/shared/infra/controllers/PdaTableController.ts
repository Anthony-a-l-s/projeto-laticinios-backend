import { Request, Response } from "express";
const knex = require('../../infra/knex/connection');

module.exports = {
    async index(req: Request, res: Response) {


        const result = await knex('pda_tables')

        return res.json(result)

    },

    async UmPdaTable(req: Request, res: Response) {
        const { pdaTableId } = req.params

        const result = await knex('pda_tables').where({ id_pda_table: pdaTableId })

        return res.json(result)

    },

    async create(req: Request, res: Response, next: any) {

        try {
            const { pdaRefTableId } = req.params
            const { responsible, funct } = req.body
            await knex('pda_tables').insert({
                responsible,
                funct,
                id_pda_ref_table: pdaRefTableId,
            })
            const pdaTable = {
                responsible,
                funct,
                pdaRefTableId
            }
            return res.status(201).json(pdaTable)
        } catch (error) {
            next(error)
        }
    },

    async update(req: Request, res: Response, next: any) {
        try {
            const { responsible, funct } = req.body
            console.log(responsible + ' ' + funct)
            const { pdaTableId } = req.params
            await knex('pda_tables')
                .update({
                    responsible,
                    funct,
                })
                .where({ id_pda_table: pdaTableId })
            return res.status(200).json("PDA ceditado com sucesso")
        } catch (error) {
            next(error)
        }
    },

    async delete(req: Request, res: Response, next: any) {

        try {
            const { pdaTableId } = req.params
            await knex('pda_tables')
                .where({ id_pda_table: pdaTableId })
                .del()

                return res.status(200).json("PDA excluído com sucesso")
        } catch (error) {
            next(error)
        }
    },
}