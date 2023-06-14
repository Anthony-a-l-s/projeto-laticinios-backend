import { Request, Response } from 'express';

const knex = require('../../shared/infra/knex/connection')

module.exports = {

        //funcao para pegar todos os company cadastrados
    async index(req: Request, res: Response) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        const result = await knex('Company')

        return res.json(result)
    },

        //funcao para pegar cadastrar um company
    async create(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {
            const { corporateName, fantasyName, cnpj, stateRegistration, municipalRegistration,active } = req.body
            const { userId } = req.params
            
            await knex('Company')
            .create({ corporateName, fantasyName, cnpj, stateRegistration, municipalRegistration, active })
            .where({ userId })

            return res.status(201).send()

        } catch(error) {
            next(error)
        }
    },

        //funcao para atualizar um Company cadastrado
    async update(req: Request, res: Response, next: any) {
        try {

            const { corporateName, fantasyName, cnpj, stateRegistration, municipalRegistration,active } = req.body
            const { legalPersonId } = req.params

            await knex('Company')
            .update({ corporateName, fantasyName, cnpj, stateRegistration, municipalRegistration,active })
            .where({ legalPersonId })

            return res.send()

        } catch(error) {
            next(error)
        }
    },


        //funcao para apagar um Company
    async delete(req: Request, res: Response, next: any) {
        try {
            const { legalPersonId } = req.body

            await knex('Company')
            .where({ legalPersonId })
            .del()

            return res.send()
        } catch(error) {
            next(error)
        }
    }

}