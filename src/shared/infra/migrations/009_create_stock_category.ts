import { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('sotck_category', table => {
        table.string('id').primary();
        table.string('nome').notNullable();
        table.boolean('deleted_at');
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('sotck_category');
}