import { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('PDA_questionTable', table => {
        table.string('id').primary();
        table.string('pda_id').notNullable();
        table.foreign('pda_id').references('pda_tables_id');
        table.string('question_id').notNullable();
        table.foreign('question_id').references('questions.id');
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('PDA_questionTable');
}
