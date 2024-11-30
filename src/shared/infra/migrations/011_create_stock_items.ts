import { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('stock_items', table => {
        table.string('id').primary();
        table.string('categoria').notNullable();
        table.foreign('categoria').references('sotck_category.id');
        table.string('nome').notNullable();
        table.string('fornecedor').notNullable();
        table.string('lote').notNullable();
        table.integer('quantidade').notNullable();
        table.date('validade').notNullable();
        table.string('info').notNullable;
        table.string('dataFormatada').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('stock_items');
}