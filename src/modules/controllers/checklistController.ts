import { Request, Response } from "express";
const knex = require('../../shared/infra/knex/connection');

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
            const { Title, active } = req.body
            const { userId } = req.params

            const checId = await knex('checklist').insert({
                Title,
                active,
                creationDate: new Date(),
                userId
            })

            const checklist = {
                Title,
                active,
                userId,
                checId
            }

            return res.status(201).json(checklist)
        } catch (error) {
            next(error)
        }
    },


     //funcao para atualizar um checklist
    async update(req: Request, res: Response, next: any) {
     
        try {
            const { Title, active } = req.body
            const { checklistId } = req.params

            await knex('checklist')
                .update({
                    Title,
                    active,
                    creationDate: new Date(),
                })
                .where({ checklistId })

            return res.status(200).send()
        } catch (error) {
            next(error)
        }
    },

     //funcao para apagar um checklist
    async delete(req: Request, res: Response, next: any) {
       
        try {
            const { checklistId } = req.params

            await knex('checklist')
                .where({ checklistId })
                .del()

            return res.send()
        } catch (error) {
            next(error)
        }
    },

}