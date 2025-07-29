import { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('topics', table => {
        table.string('id').primary();
        table.text('title').notNullable();
        table.text('description');
        table.string('status').notNullable();
        table.boolean('active').notNullable();
        table.string('checklist_id').notNullable();
        table.foreign('checklist_id').references('checklists.id');
        table.boolean('deleted_at');
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('topics');
}
