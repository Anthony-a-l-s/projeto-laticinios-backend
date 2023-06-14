import {Knex} from 'knex';

export async function up (knex: Knex ){
    return  knex.schema.createTable('documents', table => {
        table.increments('id').primary();
        table.string('name',100).notNullable();
        table.string('path').notNullable();
        table.integer('user_id').notNullable().unsigned();
        table.foreign('user_id').references('users.id');
        table.timestamps(true, true);
    });
}

export async function down (knex: Knex){
     return knex.schema.dropTable('documents');
}
