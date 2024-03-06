import { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('pda_table', table => {
        table.increments('id').primary();
        table.integer('pda_ref_table_id').notNullable().unsigned();
        table.foreign('pda_ref_table_id').references('pda_ref_table.id');
        table.string('responsible').notNullable();
        table.string('funct').notNullable();
        table.timestamps(true, true);

    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('pda_table');
}