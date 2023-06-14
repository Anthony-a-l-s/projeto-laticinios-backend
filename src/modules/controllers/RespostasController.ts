import { Request, Response } from "express";
const knex = require('../../shared/infra/knex/connection');

module.exports = {
    
    //funcao para pegar todas respostas cadasrtradas
    async index(req: Request, res: Response) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        const result = await knex('response')

        return res.json(result)

    },

    //funcao para pegar todas respostas de um usuario
    async userResponses(req: Request, res: Response) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')

        const { userId } = req.params

        const result = await knex('response').where({ userId })

        return res.json(result)

    },

    // funcao para cadastrar uma resposta
    async create(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {
            const { observation, response, latitude, longitude } = req.body
            const { questionId, userId } = req.params

            await knex('response').insert({
                observation,
                response,
                latitude,
                longitude,
                responseDate: new Date(),
                questionId,
                userId
            }).where({ questionId, userId })

            return res.status(201).send()
        } catch (error) {
            next(error)
        }
    },

        //funcao para atualizar os dados duma resposta cadasrtrada
    async update(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {
            const { observation, response, latitude, longitude } = req.body
            const { responseId } = req.params

            await knex('response')
                .update({
                    observation,
                    response,
                    latitude,
                    longitude,
                    responseDate: new Date()
                })
                .where({ responseId })

            return res.status(200).send()
        } catch (error) {
            next(error)
        }
    },

    //funcao para apagar uma resposta cadasrtrada
    async delete(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {
            const { responseId } = req.params

            await knex('response')
                .where({ responseId })
                .del()

            return res.send()
        } catch (error) {
            next(error)
        }
    },

}