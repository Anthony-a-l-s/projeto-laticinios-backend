import { Request, Response } from "express";

const knex = require('../../shared/infra/knex/connection');

module.exports = {

    //funcao para pegar todos as notificacoes cadastrados
    async index(req: Request, res: Response) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        const result = knex('notifications')

        return res.json(result)
    },

    //funcao para cadastrar uma notificacao
    async create(req: Request, res: Response, next:any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {

        const { description } = req.body
        const { userId } = req.params

       
        await knex('notifications')
        .create({ description })
        .where({ userId })

            return res.status(201).send()

        } catch(error) {
            next(error)
        }

    },

    //funcao para atualizar uma notificacao cadastrado
    async update(req:Request, res: Response, next:any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {

            const { description } = req.body
            const { notificationId } = req.params
    
            await knex('notifications')
            .update({ description })
            .where({ notificationId })
    
                return res.send()
    
            } catch(error) {
                next(error)
            }
    },

            //funcao para excluir uma notificacao cadastrado
    async delete(req: Request, res: Response, next:any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {

            const { notificationId } = req.params
    
            await knex('notifications')
            .where({ notificationId })
            .del()
    
                return res.send()
    
            } catch(error) {
                next(error)
            }
    }


}