import { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('topics', table => {
        table.increments('id').primary();
        table.text('title').notNullable();
        table.text('description').notNullable();
        table.string('status').notNullable();
        table.boolean('active').notNullable();
        table.integer('checklist_id').notNullable().unsigned();
        table.foreign('checklist_id').references('checklists.id');
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('topics');
}
