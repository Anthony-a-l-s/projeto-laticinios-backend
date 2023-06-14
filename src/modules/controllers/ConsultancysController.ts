import { Request, Response } from "express";
const knex = require('../../shared/infra/knex/connection');

module.exports = {
    
    //funcao para pegar todos os consultores cadastrados
    async index(req: Request, res: Response) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        const result = await knex('consultancys')

        return res.json(result)
    },

    //funcao para cadastrar um consultore
    async create(req: Request, res: Response, next:any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {

        const { crmv } = req.body
        const { userId } = req.params

        await knex('consultancys')
        .create({ crmv })
        .where({ userId })

            return res.status(201).send()

        } catch(error) {
            next(error)
        }

    },

    //funcao para atualizar um consultor cadastrado
    async update(req:Request, res: Response, next:any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {

            const { crmv } = req.body
            const { consultancyId } = req.params
    
            await knex('consultancys')
            .update({ crmv })
            .where({ consultancyId })
    
                return res.send()
    
            } catch(error) {
                next(error)
            }
    },

    //funcao para deletar um consultor cadastrado
    async delete(req: Request, res: Response, next:any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {

            const { consultancyId } = req.params
    
            await knex('consultancys')
            .where({ consultancyId })
            .del()
    
                return res.send()
    
            } catch(error) {
                next(error)
            }
    }



}