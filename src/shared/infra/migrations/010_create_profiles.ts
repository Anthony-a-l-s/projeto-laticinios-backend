import { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('profiles', table => {
        table.string('id').primary();
        table.string('type').notNullable();
        table.string('cnpj').notNullable();
        table.string('address').notNullable();
        table.string('register_number').notNullable();
        table.integer('active').notNullable();
        table.string('user_id').notNullable();
        table.foreign('user_id').references('users.id');
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('profiles');
}


