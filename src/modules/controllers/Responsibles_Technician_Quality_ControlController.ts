import { Request, Response } from "express";
const knex = require('../../shared/infra/knex/connection');

module.exports = {

        //funcao para pegar todos os responsavel tecnicos cadasrtrado
    async index(req: Request, res: Response) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        const result = await knex('rtqc')

        return res.json(result)

    },

        //funcao de cadastro de um responsavel tecnico
    async create(req: Request, res: Response, next:any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {

        const { councilNumber, bossQualityControl, crq } = req.body
        const { userId } = req.params

        await knex('rtqc')
        .create({ councilNumber, bossQualityControl, crq })
        .where({ userId })

            return res.status(201).send()

        } catch(error) {
            next(error)
        }

    },

        //funcao para atualizar os dados de um responsavel tecnico cadasrtrado
    async update(req: Request, res: Response, next:any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {

        const { councilNumber, bossQualityControl, crq } = req.body
        const { responsibleId } = req.params

        await knex('rtqc')
        .update({ councilNumber, bossQualityControl, crq })
        .where({ responsibleId })

            return res.send()

        } catch(error) {
            next(error)
        }

    },


        //funcao para excluir os dados de um responsavel tecnico cadasrtrado
    async delete(req: Request, res: Response, next:any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {

        const { responsibleId } = req.params

        await knex('rtqc')
        .where({ responsibleId })
        .del()

            return res.send()

        } catch(error) {
            next(error)
        }

    }

}