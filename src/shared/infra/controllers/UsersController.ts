import { Request, Response } from "express";
const knex = require('../../infra/knex/connection');
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const { v4: uuidv4 } = require('uuid');

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

function verifyCpf(cpf: string) {
    cpf = (cpf.match(/\d/g) || []).join("");
    var Soma;
    var Resto;
    Soma = 0;
    if (cpf == "00000000000") return false;

    for (let i = 1; i <= 9; i++)
        Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(cpf.substring(9, 10))) return false;

    Soma = 0;
    for (let i = 1; i <= 10; i++)
        Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(cpf.substring(10, 11))) return false;
    return true;
};


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

    async umUser(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {
            const { userId } = req.params
            const result = await knex('users').where({ id: userId })

            return res.json(result)
        } catch (error) {
            console.log(error)
            next(error)
        }
    },


    //funcao de cadastro de usuario
    async create(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {
            const { id, name, email, phone, cpf, password, active } = req.body
            //const { loginId } = req.params
            const aux_email = await knex('users')
                .select("email")
                .where({ email })

            // se o email nao existe o processo continua
            if (aux_email.length === 0) {

                if (verifyCpf(cpf)) {
                    // Testando a senha para ver se respeita todos os reuisitos de uma senha
                    let aux = testPassword(password)
                    if (aux == 1) {
                        //Encriptando a senha com o bcrypt
                        const hash = await bcrypt.hash(password, 10)
                        // const hash = crypto.createHash("sha256").update(password).digest('hex')
                        // Fazndo a insercao no banco 
                        const userId = uuidv4();
                        const user = await knex('users').insert({
                            id: id || userId,
                            name,
                            email,
                            phone,
                            cpf,
                            password: hash,
                            active
                        })

                        // Pegando o Id do login cadastrado para poder retornar
                        const register = {
                            id: userId,
                            name,
                            email,
                            phone,
                            cpf,
                            password,
                            active,
                        }
                        return res.status(201).json(register)


                    } else if (aux == 2) {
                        //Messagens de erros caso a verificacao de senha encontra um problema na senha
                        return res.status(401).send({ message: "A senha deve ter pelo menos 8 dígitos" })
                    } else {
                        console.log("A senha deve conter letras maiusculas, minusculas e números")
                        return res.status(401).send({ message: "A senha deve conter letras maiusculas, minusculas e números" })
                    }
                } else {
                    console.log('CPF is invalid ')
                    return res.status(401).send({ message: 'CPF is invalid ' })
                }
            } else {
                //Messagem de erro caso o login ja existe
                console.log('Email already exists')
                return res.status(401).send({ message: 'Email already exists' })
            }

        } catch (error) {
            console.log(error)
            next(error)
        }
    },

    async getAdmin(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {
            knex('users').where({ name: 'admin' })
                .then((user: any) => {
                    knex('profiles').where({ user_id: user[0].id })
                        .then((profile: any) => {
                            const admin = {
                                user: {
                                    id: user[0].id,
                                    name: user[0].name,
                                    email: user[0].email,
                                    phone: user[0].phone,
                                    cpf: user[0].cpf,
                                    password: user[0].password,
                                    active: user[0].active,
                                    created_at: user[0].created_at,
                                    updated_at: user[0].updated_at,
                                },
                                profile: {
                                    id: profile[0].id,
                                    type: profile[0].type,
                                    cnpj: profile[0].cnpj,
                                    address: profile[0].address,
                                    register_number: profile[0].register_number,
                                    active: profile[0].active,
                                    created_at: profile[0].created_at,
                                    updated_at: profile[0].updated_at,
                                    user_id: profile[0].user_id
                                }
                            }
                            return res.json(admin)
                        })
                        .catch((error: any) => {
                            console.log('get profile error: ' + error)
                        })
                })
                .catch((error: any) => {
                    console.log('get user error: ' + error)
                })

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
            const { name, email, phone, cpf, password, active } = req.body
            const { userId } = req.params

            await knex('users')
                .update({
                    name,
                    email,
                    phone,
                    cpf,
                    password,
                    active
                })
                .where({ id: userId })

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
                .where({ id: userId })
                .del()

            return res.status(200).json("Usuário excluído som sucesso")
        } catch (error) {
            next(error)
        }
    },

}