import { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('pda_table', table => {
        table.string('id').primary();
        table.string('pda_ref_table_id').notNullable();
        table.foreign('pda_ref_table_id').references('pda_ref_table.id');
        table.string('responsible').notNullable();
        table.string('deadline').notNullable();
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('pda_table');
}