import { Request, Response } from "express";
const knex = require('../../shared/infra/knex/connection');

module.exports = {
   
    //funcao para pegar todos os auditores cadasrtrados
   async index(req: Request, res: Response) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        const result = await knex('users')

        return res.json(result)

    },

    //Funcao para cadastrar um auditor
    async create(req: Request, res: Response, next:any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {

        const { registrationNumber } = req.body
        const { userId } = req.params

        await knex('taxauditors')
        .create({ registrationNumber })
        .where({ userId })

            return res.status(201).send()

        } catch(error) {
            next(error)
        }

    },

        //funcao para atualizar os dados de um auditor cadasrtrado
    async update(req:Request, res: Response, next:any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {

            const { registrationNumber } = req.body
            const { taxAuditorId } = req.params
    
            await knex('taxauditors')
            .update({ registrationNumber })
            .where({ taxAuditorId })
    
                return res.send()
    
            } catch(error) {
                next(error)
            }
    },

        //funcao para excluir um auditor cadasrtrado
    async delete(req: Request, res: Response, next:any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {

            const { taxAuditorId } = req.params
    
            await knex('taxauditors')
            .where({ taxAuditorId })
            .del()
    
                return res.send()
    
            } catch(error) {
                next(error)
            }
    }



}