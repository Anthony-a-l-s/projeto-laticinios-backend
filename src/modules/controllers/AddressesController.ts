import { Request, Response } from 'express';
const knex = require('../../shared/infra/knex/connection')

module.exports = {

    //funcao para pegar todos os enderecos cadastrados
    async index(req: Request, res: Response) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        const result = await knex('address')

        return res.json(result)
    },

    //funcao para cadastro de endereco
    async create(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {
            const { zipCode, city, district,
                street, state, number, complement, phone } = req.body

            const { userId } = req.params

            await knex('address').insert({
                userId,
                zipCode,
                city,
                district,
                street,
                state,
                number,
                complement,
                phone
            })
            .where({ userId })

            return res.status(201).send()

        } catch (error) {
            next(error)

        }
    },


            //funcao para atualizacao de endereco
    async update(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {

            const { zipCode, city, district,
                street, state, number, complement, phone } = req.body

            const { addressId } = req.params

            await knex('address')
                .update({
                    zipCode,
                    city,
                    district,
                    street,
                    state,
                    number,
                    complement,
                    phone
                })
                .where({ addressId })

            return res.status(200).send()
        }
        catch (error) {
            next(error)
        }
    },


    //funcao para deletar um endereco dado o id dele
    async delete(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {
            const { addressId } = req.params

            await knex('address')
            .where({ addressId })
            .del()

            return res.send()

        } catch(error) {
            next(error)
        }
    } 

}