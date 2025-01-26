import { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('questions', table => {
        table.string('id').primary();
        table.text('title').notNullable();
        table.string('status').notNullable();
        table.integer('value').notNullable();
        table.boolean('active').notNullable();
        table.string('comment');
        table.string('topic_id').notNullable();
        table.foreign('topic_id').references('topics.id');
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('questions');
}
