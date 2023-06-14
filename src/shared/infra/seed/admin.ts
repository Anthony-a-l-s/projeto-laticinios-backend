import { Knex } from "knex"

const bcrypt = require('bcrypt')
const knex = require('../knex/connection')

async function createAdmin() {
    try {
        
        const name = 'Habirou'
        const hasCompany = true
        const active = true 
        const registro = 161278236
        const password = 'appLaticiniosUfjf2022'
        const email = 'habiroumamah@gmail.com'

        const admin = await knex('login').where({ email: email })

        if (admin.length == 0) {
            //Encryptagem de senha
            const hash = await bcrypt.hash(password, 10)

            // Fazndo a insercao no banco 
            await knex('login').insert({
                email,
                password: hash
            })

            const adminId = await knex('login').select('loginId').where({ email })

            const loginId = adminId[0].loginId

            console.log(loginId)
            
            await knex('users').insert({
                name,
                hasCompany,
                active,
                registro,
                loginId
            })
            console.log("usuario criado com sucesso")
        }
    } catch (error) {
        console.log(error)
    }
}

createAdmin().then(() => console.log("Admin created sucefuly"));