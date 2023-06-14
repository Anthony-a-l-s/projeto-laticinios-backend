import { Request, Response } from 'express'

const knex = require('../../shared/infra/knex/connection')

module.exports = {

        //funcao para pegar todos os NatualPerson cadastrado
    async index(req: Request, res: Response) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        const result = await knex('naturalPerson')

        return res.json(result)
    },


    //funcao para cadastrar um NatualPerson 
    async create(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {

            const { cpf, rg } = req.body
            const { userId } = req.params

            await knex('naturalPerson')
                .create({ cpf, rg })
                .where({ userId })

            return res.status(201).send()
        } catch (error) {
            next(error)
        }
    },

    //funcao para atualizar  um NatualPerson cadastrado
    async update(req: Request, res: Response, next:any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {

            const { cpf, rg } = req.body
            const { naturalPersonId } = req.params

            await knex('naturalPerson')
            .update({ cpf, rg })
            .where({ naturalPersonId })

            return res.send()

        } catch (error) {
            next(error)
        }

    },

    //funcao para excluir um NatualPerson cadastrado
    async delete(req: Request, res:Response, next:any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {

            const { naturalPersonId } = req.body

            await knex('naturalPerson')
            .where({ naturalPersonId })
            .del()

            return res.send()

        } catch(error) {
            next(error)
        }
    }

}