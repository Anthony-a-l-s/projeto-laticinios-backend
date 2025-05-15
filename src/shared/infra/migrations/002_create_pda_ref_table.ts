import { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('pda_ref_table', table => {
        table.string('id').primary();
        table.text('pda').notNullable();
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('pda_ref_table');
}