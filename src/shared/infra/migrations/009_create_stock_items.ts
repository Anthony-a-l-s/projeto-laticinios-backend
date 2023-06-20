import {Knex} from 'knex';

export async function up (knex: Knex ){
    return  knex.schema.createTable('stock_items', table => {
        table.increments('id').primary().index();
        table.integer('sotck_category_id').notNullable().unsigned();
        table.foreign('sotck_category_id').references('sotck_category');
        table.string('name').notNullable();
        table.string('supplier').notNullable();
        table.string('batch').notNullable();
        table.integer('amount').notNullable();
        table.date('validity').notNullable();
        table.string('info').notNullable;  
        table.string('formatted_date').notNullable();    
    });
}

export async function down (knex: Knex){
     return knex.schema.dropTable('stock_items');
}