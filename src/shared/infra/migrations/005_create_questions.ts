import {Knex} from 'knex';

export async function up (knex: Knex ){
    return  knex.schema.createTable('questions', table => {
        table.increments('id_question').primary();
        table.text('title').notNullable();
        table.text('description').notNullable();
        table.string('status').notNullable();
        table.integer('value').notNullable();
        table.boolean('active').notNullable();
        table.string('comment').notNullable();
        table.integer('id_topic').notNullable().unsigned();
        table.foreign('id_topic').references('topics.id_topic');
        table.integer('id_pda_table').notNullable().unsigned();
        table.foreign('id_pda_table').references('pda_tables.id_pda_table');
        table.timestamps(true, true);
    });
}

export async function down (knex: Knex){
     return knex.schema.dropTable('questions');
}
