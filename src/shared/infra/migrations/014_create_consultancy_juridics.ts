import {Knex} from 'knex';

export async function up (knex: Knex ){
    return  knex.schema.createTable('consultancy_juridics', table => {
        table.increments('id').primary();
        table.string('cnpj').notNullable();
        table.string('address').notNullable();
        table.string('class_registration_number').notNullable();
        table.integer('user_id').notNullable().unsigned();
        table.foreign('user_id').references('users.id');
        table.timestamps(true, true);
    });
}

export async function down (knex: Knex){
     return knex.schema.dropTable('consultancy_juridics');
}
