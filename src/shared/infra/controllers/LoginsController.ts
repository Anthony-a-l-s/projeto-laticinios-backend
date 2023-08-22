import { Request, Response } from "express";
const knex = require('../knex/connection');
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const jwt = require("jsonwebtoken");
require('dotenv').config

/** 
 * Validacao de senha
 * 0 - Deve conter letras maiusculas, minusculas e numeros
 * 1 - Senha valida
 * 2 - Senha curta  
*/
function testPassword(password: string) {
    if (password.length >= 8) {
        const upperCase = /[A-Z]/
        const lowerCase = /[a-z]/
        const number = /[0-9]/
        return (upperCase.test(password)
            && lowerCase.test(password)
            && number.test(password))
    }
    return 2
}


module.exports = {

    //funcao para retornar todos os logins cadastrado
    async index(req: Request, res: Response) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        const result = await knex('login')

        return res.json(result)

    },

    //funcao para criar um login
    async create(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {
            const { email, password } = req.body

            //Verificando se o email ja existe
            const aux_email = await knex('login')
                .select("email")
                .where({ email })


            // se o email nao existe o processo continua
            if (aux_email.length == 0) {

                // Testando a senha para ver se respeita todos os reuisitos de uma senha
                let aux = testPassword(password)
                if (aux == 1) {
                    //Encriptando a senha com o bcrypt
                    const hash = await bcrypt.hash(password, 10)
                    // const hash = crypto.createHash("sha256").update(password).digest('hex')

                    // Fazndo a insercao no banco 
                    await knex('login').insert({
                        email,
                        password: hash
                    })

                    // Pegando o Id do login cadastrado para poder retornar
                    const [{ loginId }] = await knex('login')
                        .select('loginId')
                        .where({ email })

                    //Retornando o loginId com sucesso da operacai
                    return res.status(201).send({ loginId })

                } else if (aux == 2) {
                    //Messagens de erros caso a verificacao de senha encontra um problema na senha
                    return res.status(401).send({ message: "A senha deve ter pelo menos 8 dígitos" })
                } else {
                    return res.status(401).send({ message: "A senha deve conter letras maiusculas, minusculas e números" })
                }
            } else {
                //Messagem de erro caso o login ja existe
                return res.status(401).send({ message: 'Email already exists' })
            }

        } catch (error) {
            next(error)
        }
    },

    async login(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {
            const { mail, password } = req.body
            const user = await knex('users').where({ mail: mail })
            if (user.length == 0) {
                return res.status(401).json({ error: "Email ou senha incorretos" });
            } else if (!bcrypt.compareSync(password, user[0].password)) {
                return res.status(401).json({ error: "Email ou senha incorretos" });
            }
            const profile = await knex('profiles').where({ id_user: user[0].id_user })
            return res.status(201).json(profile)

        } catch (error) {
            next(error)
        }

    },
    async update(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {
            const { email, password } = req.body

            const hash = bcrypt.hash(password, 10, (errBcrypt: any) => {
                if (errBcrypt) {
                    return res.status(500).send({ error: errBcrypt })
                }
            })

            await knex('login')
                .update({
                    password: hash
                })
                .where({ email })
            return res.status(200).send()
        } catch (error) {
            next(error)
        }
    },

    async delete(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {
            const { loginId } = req.params

            await knex('login')
                .where({ loginId })
                .del()

            return res.send()
        } catch (error) {
            next(error)
        }
    },

}
