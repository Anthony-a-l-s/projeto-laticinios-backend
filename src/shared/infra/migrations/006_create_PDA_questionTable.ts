import { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('PDA_questionTable', table => {
        table.increments('id').primary();
        table.integer('pda_id').notNullable().unsigned();
        table.foreign('pda_id').references('pda_tables_id');
        table.integer('question_id').notNullable().unsigned();
        table.foreign('question_id').references('questions.id');
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('PDA_questionTable');
}
