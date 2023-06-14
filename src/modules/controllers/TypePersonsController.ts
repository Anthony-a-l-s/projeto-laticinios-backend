import { Request, Response } from "express";
const knex = require('../../shared/infra/knex/connection')

module.exports = {

        //funcao para pegar todos os tipos cadastrado
    async index(req: Request, res: Response) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        const result = await knex('typepersons')

        return res.json(result)
    },

    //funcao para criar um tipo de pessoa
    async create(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {
            const { typePerson, activeUser } = req.body
            const { userId } = req.params

            await knex('typepersons')
                .insert({ userId, typePerson, activeUser })
                .where({ userId })

            return res.status(201).send()
        } catch (error) {
            next(error)
        }
    },


    //funcao para atualizar um tipo de pessoa cadasrtrado
    async update(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {

            const { activeUser } = req.body
            const { userId } = req.params

            await knex('typepersons')
            .update({ activeUser })
            .where({ userId })

            return res.send()

        } catch(error) {
            next(error)
        }
    },

            //funcao para excluir um tipo de pessoa cadasrtrado
    async delete(req: Request, res:Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {
            const { typePersonId } = req.params

            await knex('typepersons')
            .where({ typePersonId })
            .del()

            return res.send()


        } catch (error) {
            next(error)
        }
    }
}