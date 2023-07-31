import {Knex} from 'knex';

export async function up (knex: Knex ){
    return  knex.schema.createTable('users', table => {
        table.increments('id_user').primary();
        table.string('name').notNullable();
        table.string('mail').notNullable().unique();
        table.string('phone_number').notNullable();
        table.string('cpf').notNullable();
        table.string('password').notNullable();
        table.integer('active').notNullable();
        table.timestamps(true, true);
    });
}

export async function down (knex: Knex){
     return knex.schema.dropTable('users');
}
