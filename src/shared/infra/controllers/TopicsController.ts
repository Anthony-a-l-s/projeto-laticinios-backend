import { Request, Response } from "express";
const knex = require('../knex/connection');

module.exports = {

    async index(req: Request, res: Response) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        const result = await knex('topics')

        return res.json(result)

    },


    async lista(req: Request, res: Response) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        const { checklistId } = req.params

        const result = await knex('topics').where({ checklist_id: checklistId })

        return res.json(result)

    },

    async create(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {
            const { title, description, status, active } = req.body
            const { checklistId} = req.params

            await knex('topics').insert({
                title,
                description,
                status,
                active, 
                checklist_id: checklistId,
            })
            const topic = {
                title,
                description,
                status,
                active, 
                checklistId, 
            }
            return res.status(200).json(topic)
        } catch (error) {
            next(error)
        }
    },

    async update(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {
            const { title, description, status, active, } = req.body
            const { topicId } = req.params

            await knex('topics')
                .update({
                    title,
                    description,
                    status,
                    active,
                }).where({ id: topicId })

            return res.status(200).json('Tópico editado com sucesso!')
        } catch (error) {
            next(error)
        }
    },



    async delete(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {
            const { topicId } = req.params

            await knex('topics')
                .where({ id: topicId })
                .del()

            return res.status(200).json('Tópico excluído com sucesso!')
        } catch (error) {
            next(error)
        }
    },

}

