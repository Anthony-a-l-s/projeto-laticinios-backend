import { Request, Response } from "express";
const knex = require('../../infra/knex/connection');

module.exports = {

            //funcao para listar todos os usuarios cadastrados 
    async index(req: Request, res: Response) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        const result = await knex('users')

        return res.json(result)

    },

    async umUser(req: Request, res: Response) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        const { userId } = req.params
        console.log(userId)
        const result = await knex('users').where({ id_user: userId })

        return res.json(result)

    },


            //funcao de cadastro de usuario
    async create(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {
            const { name, mail, phone_number, cpf, password,active, cnpj, address, register_number, ocupation } = req.body
            //const { loginId } = req.params
            const user = await knex('users').insert({
                name,
                mail,
                phone_number, 
                cpf,
                password,
                active
            })
           
            const register ={
                name,
                mail,
                phone_number, 
                cpf,
                password,
                active,
            }
            return res.status(201).json(register)
        } catch (error) {
            console.log(error)
            next(error)
        }
    },

            //funcao para atualizar os dados dum usuario cadasrtrado
    async update(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {
            const { name, mail, phone_number, cpf, password,active } = req.body
            const { userId } = req.params

            await knex('users')
                .update({
                    name,
                    mail,
                    phone_number, 
                    cpf,
                    password,
                    active
                })
                .where({ id_user: userId })

            return res.status(200).json("usuário editado feita com sucesso")
        } catch (error) {
            next(error)
        }
    },


    //Funcao para excluir um usuario
    async delete(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {
            const { userId } = req.params

            await knex('users')
                .where({ id_user: userId })
                .del()

            return res.status(200).json("Usuário excluído som sucesso")
        } catch (error) {
            next(error)
        }
    },

}