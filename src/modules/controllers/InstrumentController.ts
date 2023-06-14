import { Request, Response } from 'express';

const knex = require('../../shared/infra/knex/connection')

module.exports = {

        //funcao para pegar todos os categoria de produto cadastrados
    async index(req: Request, res: Response) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        const result = await knex('instruments')

        return res.json(result)
    },

        //funcao para pegar cadastrar um instruments
    async create(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {
            const { name, IdentificationCode,lastCalibration, nextCalibration } = req.body
            const { userId } = req.params
            
            await knex('instruments')
            .create({ name, IdentificationCode,lastCalibration, nextCalibration })
            .where({ userId })

            return res.status(201).send()

        } catch(error) {
            next(error)
        }
    },

        //funcao para atualizar um instruments cadastrado
    async update(req: Request, res: Response, next: any) {
        try {

            const { name, IdentificationCode,lastCalibration, nextCalibration } = req.body
            const { instrumentId } = req.params

            await knex('instruments')
            .update({ name, IdentificationCode,lastCalibration, nextCalibration })
            .where({ instrumentId })

            return res.send()

        } catch(error) {
            next(error)
        }
    },


        //funcao para apagar um instruments
    async delete(req: Request, res: Response, next: any) {
        try {
            const { instrumentId } = req.body

            await knex('instruments')
            .where({ instrumentId })
            .del()

            return res.send()
        } catch(error) {
            next(error)
        }
    }

}