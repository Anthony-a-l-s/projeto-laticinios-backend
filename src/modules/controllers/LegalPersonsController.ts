import { Request, Response } from 'express'

const knex = require('../../shared/infra/knex/connection')

module.exports = {

        //funcao para pagar todos os legalPerson cadastrado
    async index(req: Request, res: Response) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        const result = knex('legalpersons')

        return res.json(result)
    },

        //funcao para cadastrar um legalPerson
    async create(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {

            const { corporateName,
                fantasyName,
                cnpj,
                stateRegistration,
                municipalRegistration } =
                req.body

            const { userId } = req.body

            await knex('legalpersons')
                .create({
                    corporateName,
                    fantasyName,
                    cnpj,
                    stateRegistration,
                    municipalRegistration
                })
                .where({ userId })

            return res.status(201).send()


        } catch (error) {
            next(error)
        }

    },

        //funcao para atualizar os dados de um legalPerson cadastrado
    async update(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {
            const { corporateName,
                fantasyName,
                cnpj,
                stateRegistration,
                municipalRegistration } =
                req.body

            const { legalPersonId } = req.params

            await knex('legalpersons')
                .update({
                    corporateName,
                    fantasyName,
                    cnpj,
                    stateRegistration,
                    municipalRegistration
                })
                .where({ legalPersonId })

            return res.send()

        } catch (error) {
            next(error)
        }
    },

        //funcao para deletar um legalPerson cadastrado
    async delete(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {

            const { legalPersonId } = req.params

            await knex('legalpersons')
            .where({ legalPersonId })
            .del()

            return res.send()

        } catch(error) {
            next(error)
        }
    }

}