import { Request, Response } from "express";
const knex = require('../../shared/infra/knex/connection');

module.exports = {
    //Para pegar todos as perguntas
    async index(req: Request, res: Response) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        const result = await knex('question')

        return res.json(result)

    },

    //Para pegar as perguntas de um topico
    async questionsOfAnTopic(req: Request, res: Response) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        const { topicId } = req.params

        const result = await knex('question').where({ topicId })

        return res.json(result).status(200)

    },

    //Para criar todos as perguntas
    async create(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {
            const { description } = req.body
            const { topicId } = req.params


            await knex('question').insert({
                description,
                topicId
            }).where({ topicId })

            return res.status(201).send()
        } catch (error) {
            next(error)
        }
    },

    
    //Para atualizar uma pergunta
    async update(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {
            const { description } = req.body
            const { questionId } = req.params

            await knex('question')
                .update({
                    description,
                })
                .where({ questionId })

            return res.status(200).send()
        } catch (error) {
            next(error)
        }
    },

    //Para apagar uma pergunta
    async delete(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {
            const { questionId } = req.params

            await knex('question')
                .where({ questionId })
                .del()

            return res.send()
        } catch (error) {
            next(error)
        }
    },

}