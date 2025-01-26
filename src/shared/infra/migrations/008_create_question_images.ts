import { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('question_images', table => {
        table.string('id').primary();
        table.string('question_id').notNullable();
        table.foreign('question_id').references('questions.id');
        table.specificType('base64', 'longblob');
        table.text('url').notNullable();

    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('question_inamges');
}