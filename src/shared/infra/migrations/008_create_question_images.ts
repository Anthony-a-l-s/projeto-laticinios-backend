import { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('question_inamges', table => {
        table.increments('id').primary();
        table.integer('question_id').notNullable().unsigned();
        table.foreign('question_id').references('questions.id');
        table.specificType('base64', 'longblob');
        table.text('url').notNullable();

    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('question_inamges');
}