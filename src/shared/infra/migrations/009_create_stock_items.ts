import {Knex} from 'knex';

export async function up (knex: Knex ){
    return  knex.schema.createTable('stock_items', table => {
        table.increments('id_stock_item').primary().index();
        table.integer('id_sotck_category').notNullable().unsigned();
        table.foreign('id_sotck_category').references('sotck_category.id_sotck_category');
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