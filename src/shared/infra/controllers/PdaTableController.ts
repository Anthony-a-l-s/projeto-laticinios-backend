import { Request, Response } from "express";
const knex = require('../../infra/knex/connection');

module.exports = {
    async index(req: Request, res: Response) {


        const result = await knex('pda_table')

        return res.json(result)

    },

    async UmPdaTable(req: Request, res: Response) {
        const { pdaTableId } = req.params

        const result = await knex('pda_table').where({ id: pdaTableId })

        return res.json(result)

    },

    async create(req: Request, res: Response, next: any) {

        try {
            const { pdaRefTableId } = req.params
            const {id, responsible, deadline } = req.body
            await knex('pda_table').insert({
                id,
                responsible,
                deadline,
                pda_ref_table_id: pdaRefTableId,
            })
            const pdaTable = {
                id,
                responsible,
                deadline,
                pdaRefTableId
            }
            return res.status(201).json(pdaTable)
        } catch (error) {
            console.log(error)
            next(error)
        }
    },

    async update(req: Request, res: Response, next: any) {
        try {
            const {id, responsible, deadline } = req.body
            console.log(responsible + ' ' + deadline)
            const { pdaTableId } = req.params
            await knex('pda_tables')
                .update({
                    id,
                    responsible,
                    deadline,
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