import { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('checklists', table => {
        table.string('id').primary();
        table.text('title').notNullable();
        table.text('description');
        table.string('status').notNullable();
        table.boolean('active').notNullable();
        table.string('user_id').notNullable();
        table.foreign('user_id').references('users.id');
        table.string('id_user_responded');
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('checklists');
}
