import { Knex } from "knex"
const bcrypt = require('bcrypt')
const knex = require('../knex/connection')
const { v4: uuidv4 } = require('uuid');
const UserController = require('../controllers/UsersController')
const GlobalContrller = require('../controllers/GlobalContrller')

async function createAdmin() {
    console.log('Criando um usuário em caso de primeira conexão')
    await GlobalContrller.verifyDataDeleted();
    try {

        const users = await knex('users')

        if (users.length > 0) {
            return
        }

        const id = uuidv4();
        const name = "admin";
        const email = "admin";
        const phone = "32970707070";
        const cpf = "08994704086";
        const password = "@Admin123";
        const active = true



        //const admin = await knex('login').where({ email: email })

        const hash = await bcrypt.hash(password, 10)

        // Fazndo a insercao no banco 
        /*await knex('login').insert({
            email,
            password: hash
        })*/

        //const adminId = await knex('login').select('loginId').where({ email })

        //const loginId = adminId[0].loginId

        //console.log(loginId)

        knex('users').insert({
            id,
            name,
            email,
            phone,
            cpf,
            password,
            active
        }).then(async () => {

            const profileId = uuidv4();
            const type = "Empresa";
            const cnpj = "123659872";
            const address = "Campus Universitário, Rua José Lourenço Kelmer, s/n - São Pedro, Juiz de Fora - MG, 36036-900";
            const register_number = "32970707070";
            const function_id = '123456789'
            const profileActive = 1;
            const user_id = "0744b53c-99a2-4529-b13a-c5f821ba92c0"

            await knex('profiles').insert({
                id: profileId,
                type,
                cnpj,
                address,
                register_number,
                function_id,
                active: profileActive,
                user_id: id,
            })

        })
        console.log("usuario criado com sucesso")


        /*if (admin.length == 0) {
            //Encryptagem de senha
            const hash = await bcrypt.hash(password, 10)

            // Fazndo a insercao no banco 
            await knex('login').insert({
                email,
                password: hash
            })

            //const adminId = await knex('login').select('loginId').where({ email })

            //const loginId = adminId[0].loginId

            console.log(loginId)
            
            await knex('users').insert({
                name,
                hasCompany,
                active,
                registro,
                loginId
            })
            console.log("usuario criado com sucesso")
        }*/
    } catch (error) {
        console.log(error)
    }
}

createAdmin().then(() => console.log("Admin created sucefuly"));