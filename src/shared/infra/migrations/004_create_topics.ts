import {Knex} from 'knex';

export async function up (knex: Knex ){
    return  knex.schema.createTable('topics', table => {
        table.increments('id_topic').primary();
        table.text('title').notNullable();
        table.text('description').notNullable();
        table.string('status').notNullable();
        table.boolean('active').notNullable();
        table.integer('id_checklist').notNullable().unsigned();
        table.foreign('id_checklist').references('checklists.id_checklist');
        table.timestamps(true, true);
    });
}

export async function down (knex: Knex){
     return knex.schema.dropTable('topics');
}
