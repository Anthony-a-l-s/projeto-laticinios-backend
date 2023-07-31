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

        const result = await knex('question_inamges').where({ topic_id: questionId})

        return res.json(result).status(200)

    },

    async oneQestionImage(req: Request, res: Response) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        const { questionImageId } = req.params

        const result = await knex('question_inamges').where({ id_question_inamge: questionImageId })

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
            const { base64, url } = req.body
            const { questionId } = req.params

            await knex('question_inamges').insert({
               base64,
               url,
               id_question: questionId, 
            })

            const question = {
                base64,
                url,
                questionId,
            }
            return res.status(201).json(question)
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
            const { 
                base64,
                url,
             } = req.body
            const { questionImageId } = req.params

            await knex('question_inamges')
                .update({
                    base64,
                    url,
                })
                .where({ id_question_inamge: questionImageId })

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
                .where({id_question_inamge: questionImageId })
                .del()
                return res.status(200).json('Imagem excluída com sucesso')
        } catch (error) {
            next(error)
        }
    },

}