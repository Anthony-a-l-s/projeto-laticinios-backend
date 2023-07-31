import {Knex} from 'knex';

export async function up (knex: Knex ){
    return  knex.schema.createTable('pda_tables', table => {
        table.increments('id_pda_table').primary();
        table.integer('id_pda_ref_table').notNullable().unsigned();
        table.foreign('id_pda_ref_table').references('pda_ref_tables.id_pda_ref_table');
        table.string('responsible').notNullable();
        table.string('funct').notNullable();
        table.timestamps(true, true);
        
    });
}

export async function down (knex: Knex){
     return knex.schema.dropTable('pda_tables');
}