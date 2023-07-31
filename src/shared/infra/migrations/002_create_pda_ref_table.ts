import {Knex} from 'knex';

export async function up (knex: Knex ){
    return  knex.schema.createTable('pda_ref_tables', table => {
        table.increments('id_pda_ref_table').primary();
        table.text('pda').notNullable();
    });
}

export async function down (knex: Knex){
     return knex.schema.dropTable('pda_ref_tables');
}