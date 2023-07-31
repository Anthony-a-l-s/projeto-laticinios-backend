import {Knex} from 'knex';

export async function up (knex: Knex ){
    return  knex.schema.createTable('taxt_auditors', table => {
        table.increments('id_taxt_auditor').primary();
        table.string('identification').notNullable();
        table.integer('id_user').notNullable().unsigned();
        table.foreign('id_user').references('users.id_user');
        table.timestamps(true, true);
    });
}

export async function down (knex: Knex){
     return knex.schema.dropTable('taxt_auditors');
}
