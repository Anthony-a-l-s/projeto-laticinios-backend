import {Knex} from 'knex';

export async function up (knex: Knex ){
    return  knex.schema.createTable('technical_manager_juridics', table => {
        table.increments('id_technical_manager_juridic').primary();
        table.string('address').notNullable();
        table.string('class_registration_number').notNullable();
        table.integer('id_user').notNullable().unsigned();
        table.foreign('id_user').references('users.id_user');
        table.timestamps(true, true);
    });
}

export async function down (knex: Knex){
     return knex.schema.dropTable('technical_manager_juridics');
}
