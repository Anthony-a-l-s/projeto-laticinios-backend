import {Knex} from 'knex';

export async function up (knex: Knex ){
    return  knex.schema.createTable('checklists', table => {
        table.increments('id_checklist').primary();
        table.text('title').notNullable();
        table.text('description').notNullable();
        table.string('status').notNullable();
        table.boolean('active').notNullable();
        table.integer('id_user').notNullable().unsigned();
        table.foreign('id_user').references('users.id_user');
        table.integer('id_user_responded');
        table.timestamps(true, true);
    });
}

export async function down (knex: Knex){
     return knex.schema.dropTable('checklists');
}
