import { Request, Response } from "express";
const knex = require('../../infra/knex/connection');

module.exports = {
    //funcao para pegar todos os checklist
    async index(req: Request, res: Response) {


        const result = await knex('checklist')

        return res.json(result)

    },

    //funcao para pegar os dados de um checklist dado o id dele
    async UmChecklist(req: Request, res: Response) {
        const { checklistId } = req.params

        const result = await knex('checklist').where({ checklistId })

        return res.json(result)

    },


    //funcao para criar um checklist
    async create(req: Request, res: Response, next: any) {

        try {
            const { title, description, status, active } = req.body
            const { user_id } = req.params
            console.log('console.log')
            await knex('checklists').insert({
                title,
                description,
                status,
                active,
                user_id,
            })
            console.log('console.log2')
            const checklist = {
                title,
                description,
                status,
                active,
                user_id,
            }
            return res.status(201).json(checklist)
        } catch (error) {
            next(error)
        }
    },


    //funcao para atualizar um checklist
    async update(req: Request, res: Response, next: any) {
        try {
            const { title,description, status, active } = req.body
            const { id } = req.params
            await knex('checklists')
                .update({
                    title,
                    description,
                    status,
                    active,
                })
                .where({ id })
            return res.status(200).send()
        } catch (error) {
            next(error)
        }
    },

    //funcao para apagar um checklist
    async delete(req: Request, res: Response, next: any) {

        try {
            const { id } = req.params

            await knex('checklists')
                .where({ id })
                .del()

            return res.send()
        } catch (error) {
            next(error)
        }
    },

}