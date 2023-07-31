import { Request, Response } from "express";
const knex = require('../../infra/knex/connection');

module.exports = {
    //funcao para pegar todos os checklist
    async index(req: Request, res: Response) {


        const result = await knex('checklists')

        return res.json(result)

    },

    //funcao para pegar os dados de um checklist dado o id dele
    async UmChecklist(req: Request, res: Response) {
        const { checklistId } = req.params

        const result = await knex('checklists').where({ id_checklist: checklistId })

        return res.json(result)

    },


    //funcao para criar um checklist
    async create(req: Request, res: Response, next: any) {

        try {
            const { title, description, status, active } = req.body
            const { userId } = req.params
            await knex('checklists').insert({
                title,
                description,
                status,
                active,
                id_user: userId,
            })
            const checklist = {
                title,
                description,
                status,
                active,
                userId,
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
            const { checklistId } = req.params
            await knex('checklists')
                .update({
                    title,
                    description,
                    status,
                    active,
                })
                .where({ id_checklist: checklistId })
            return res.status(200).json('Checklist edidado com sucesso')
        } catch (error) {
            next(error)
        }
    },

    //funcao para apagar um checklist
    async delete(req: Request, res: Response, next: any) {

        try {
            const { checklistId } = req.params

            await knex('checklists')
                .where({ id_checklist: checklistId })
                .del()

            return res.status(200).json('Checklist excluído com sucesso')
        } catch (error) {
            next(error)
        }
    },

}