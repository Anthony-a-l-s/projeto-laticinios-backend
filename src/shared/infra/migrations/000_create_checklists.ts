import {Knex} from 'knex';

export async function up (knex: Knex ){
    return  knex.schema.createTable('checklists', table => {
        table.increments('id').primary();
        table.text('title').notNullable();
        table.text('description').notNullable();
        table.string('status').notNullable();
        table.boolean('active').notNullable();
        table.timestamps(true, true);
    });
}

export async function down (knex: Knex){
     return knex.schema.dropTable('checklists');
}
