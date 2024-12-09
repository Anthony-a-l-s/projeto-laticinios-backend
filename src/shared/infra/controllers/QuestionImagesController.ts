import { Request, Response } from "express";
const knex = require('../knex/connection');

module.exports = {
    //Para pegar todos as perguntas
    async index(req: Request, res: Response) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        const result = await knex('question_inamges')

        return res.json(result)

    },

    //Para pegar as perguntas de um topico
    async imagesforQuestion(req: Request, res: Response) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        const { questionId } = req.params

        const result = await knex('question_inamges').where({ topic_id: questionId })

        return res.json(result).status(200)

    },

    async oneQestionImage(req: Request, res: Response) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        const { questionImageId } = req.params

        const result = await knex('question_inamges').where({ id: questionImageId })

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
            const { id, base64, url } = req.body
            const { questionId } = req.params

            await knex('question_inamges').insert({
                id,
                base64,
                url,
                question_id: questionId,
            })

            const question = {
                id,
                base64,
                url,
                questionId,
            }
            return res.status(201).json(question)
        } catch (error) {
            console.log(error)
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
            const {
                id,
                base64,
                url,
            } = req.body
            const { questionImageId } = req.params

            await knex('question_inamges')
                .update({
                    id,
                    base64,
                    url,
                })
                .where({ id: questionImageId })

            return res.status(200).json('Imagem editada com sucesso')
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
            const { questionImageId } = req.params

            await knex('question_inamges')
                .where({ id: questionImageId })
                .del()
            return res.status(200).json('Imagem excluída com sucesso')
        } catch (error) {
            next(error)
        }
    },

}