import {Knex} from 'knex';

export async function up (knex: Knex ){
    return  knex.schema.createTable('profiles', table => {
        table.increments('id_profile').primary();
        table.string('cnpj').notNullable();
        table.string('address').notNullable();
        table.string('register_number').notNullable();
        table.string('ocupation').notNullable();
        table.integer('id_user').notNullable().unsigned();
        table.foreign('id_user').references('users.id_user');
        table.timestamps(true, true);
    });
}

export async function down (knex: Knex){
     return knex.schema.dropTable('profiles');
}
