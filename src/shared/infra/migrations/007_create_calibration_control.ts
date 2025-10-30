import { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('calibration_control', table => {
        table.string('id').primary();
        table.string('nomeInstrumento').notNullable();
        table.boolean('isActive').notNullable();
        table.string('infoInstrumento').notNullable();
        table.string('codigoIdentificacao').notNullable();
        table.date('dataCalibracao').notNullable();
        table.string('dataCalibracaoFormatada').notNullable();
        table.date('dataProximaCalibracao');
        table.string('dataProximaCalibracaoFormatada');
        table.string('nomeEmpresaCalibrou').notNullable();
        table.string('cnpjEmpresaCalibrou').notNullable();
        table.boolean('deleted_at');
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('calibration_control');
}