import { Request, Response } from "express";
const knex = require('../../infra/knex/connection');

module.exports = {
    async index(req: Request, res: Response) {


        const result = await knex('PDA_questionTable')

        return res.json(result)

    },

    async umPDAQuestionTable(req: Request, res: Response) {
        const { pdaQuestionTableId } = req.params

        const result = await knex('PDA_questionTable').where({ id: pdaQuestionTableId })

        return res.json(result)

    },

    async create(req: Request, res: Response, next: any) {
        try {
            const { id, pda_id, question_id } = req.body
            console.log(id, pda_id, question_id)
            await knex('PDA_questionTable').insert({
                id,
                pda_id,
                question_id,
                deleted_at: false
            })
            const pdaRefTable = {
                id,
                pda_id,
                question_id
            }
            return res.status(201).json(pdaRefTable)
        } catch (error) {
            next(error)
        }
    },


    async delete(req: Request, res: Response, next: any) {

        try {
            const { pdaQuestionTableId } = req.params
            await knex('PDA_questionTable')
                .where({ id: pdaQuestionTableId })
                .del()

            return res.status(200).json("ref PDA_questionTable excluído com sucesso!")
        } catch (error) {
            next(error)
        }
    },
}