import {Knex} from 'knex';

export async function up (knex: Knex ){
    return  knex.schema.createTable('technical_manager_physicals', table => {
        table.increments('id').primary();
        table.string('address').notNullable();
        table.string('class_registration_number').notNullable();
        table.integer('user_id').notNullable().unsigned();
        table.foreign('user_id').references('users.id');
        table.timestamps(true, true);
    });
}

export async function down (knex: Knex){
     return knex.schema.dropTable('technical_manager_physicals');
}
