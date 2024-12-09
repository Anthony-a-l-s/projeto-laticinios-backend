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

        const result = await knex('checklists').where({ id: checklistId })

        return res.json(result)

    },

    async UmChecklistAllInformations(req: Request, res: Response) {
        const { checklistId } = req.params
        const {id, title, description, status, active } = req.body
        const result = await knex('checklists').where({ id: checklistId, title: title, description: description, status: status, active: active})

        return res.json(result)

    },


    //funcao para criar um checklist
    async create(req: Request, res: Response, next: any) {
            console.log('miaaaaaaauuuuuuuuu')
        try {
            const {id, title, description, status, active } = req.body
            console.log(id + ' ' + title + ' ' + description + ' ' + status + ' ' + active )
            const { userId } = req.params
            console.log(userId)
            await knex('checklists').insert({
                id,
                title,
                description,
                status,
                active,
                user_id: userId,
            })
            const checklist = {
                id,
                title,
                description,
                status,
                active,
                userId,
            }
            return res.status(201).json(checklist)
        } catch (error) {
            console.log(error)
            next(error)
        }
    },


    //funcao para atualizar um checklist
    async update(req: Request, res: Response, next: any) {
        try {
            const {id, title,description, status, active} = req.body
            const { checklistId } = req.params
            await knex('checklists')
                .update({
                    id,
                    title,
                    description,
                    status,
                    active,
                })
                .where({ id: checklistId })
            return res.status(200).json('Checklist edidado com sucesso')
        } catch (error) {
            next(error)
        }
    },

    async responded(req: Request, res: Response, next: any) {
        try {
            const { id_user_responded } = req.body
            const { checklistId } = req.params
            await knex('checklists')
                .update({
                    id_user_responded
                })
                .where({ id: checklistId })
            return res.status(200).json('Checklist respondido edidado com sucesso')
        } catch (error) {
            next(error)
        }
    },

    //funcao para apagar um checklist
    async delete(req: Request, res: Response, next: any) {

        try {
            const { checklistId } = req.params

            await knex('checklists')
                .where({ id: checklistId })
                .del()

            return res.status(200).json('Checklist excluído com sucesso')
        } catch (error) {
            next(error)
        }
    },

}