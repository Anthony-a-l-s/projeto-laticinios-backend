import {Knex} from 'knex';

export async function up (knex: Knex ){
    return  knex.schema.createTable('question_inamges', table => {
        table.increments('id_question_inamge').primary();
        table.integer('question_id_question').notNullable().unsigned();
        table.foreign('question_id_question').references('questions.id_question');
        table.specificType('base64', 'longblob');
        table.text('url').notNullable();   
       
    });
}

export async function down (knex: Knex){
     return knex.schema.dropTable('question_inamges');
}