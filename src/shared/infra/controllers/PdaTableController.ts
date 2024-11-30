import { Request, Response } from "express";
const knex = require('../../infra/knex/connection');

module.exports = {
    async index(req: Request, res: Response) {


        const result = await knex('pda_tables')

        return res.json(result)

    },

    async UmPdaTable(req: Request, res: Response) {
        const { pdaTableId } = req.params

        const result = await knex('pda_tables').where({ id: pdaTableId })

        return res.json(result)

    },

    async create(req: Request, res: Response, next: any) {

        try {
            const { pdaRefTableId } = req.params
            const {id, responsible, funct } = req.body
            await knex('pda_tables').insert({
                id,
                responsible,
                funct,
                pda_ref_table_id: pdaRefTableId,
            })
            const pdaTable = {
                id,
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
            const {id, responsible, funct } = req.body
            console.log(responsible + ' ' + funct)
            const { pdaTableId } = req.params
            await knex('pda_tables')
                .update({
                    id,
                    responsible,
                    funct,
                })
                .where({ id: pdaTableId })
            return res.status(200).json("PDA ceditado com sucesso")
        } catch (error) {
            next(error)
        }
    },

    async delete(req: Request, res: Response, next: any) {

        try {
            const { pdaTableId } = req.params
            await knex('pda_tables')
                .where({ id: pdaTableId })
                .del()

                return res.status(200).json("PDA excluído com sucesso")
        } catch (error) {
            next(error)
        }
    },
}