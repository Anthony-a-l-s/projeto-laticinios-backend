import { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('calibration_control', table => {
        table.string('id').primary();
        table.string('instrument_name').notNullable();
        table.boolean('active').notNullable();
        table.string('ifnfo_isntrument').notNullable();
        table.string('identification_code').notNullable();
        table.date('calibration_date').notNullable();
        table.date('formatted_calibration_date').notNullable();
        table.date('next_calibration_date');
        table.date('next_formatted_calibration_date');
        table.string('calibrated_company_name').notNullable();
        table.string('cnpj_calibrated_company').notNullable();
        table.boolean('deleted_at');
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('calibration_control');
}