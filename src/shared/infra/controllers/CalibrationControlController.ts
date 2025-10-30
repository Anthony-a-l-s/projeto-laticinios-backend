import { Request, Response } from "express";
const knex = require('../../infra/knex/connection');

module.exports = {
    //funcao para pegar todos os checklist
    async index(req: Request, res: Response) {


        const result = await knex('calibration_control')

        return res.json(result)

    },

    //funcao para pegar os dados de um checklist dado o id dele
    async UmCalibrationControl(req: Request, res: Response) {
        const { calibrationControlId } = req.params

        const result = await knex('calibration_control').where({ id: calibrationControlId })

        return res.json(result)

    },


    //funcao para criar um checklist
    async create(req: Request, res: Response, next: any) {
        console.log('criando controle de calibração ...')
        console.log(req.body)
        try {
            const {
                id,
                nomeInstrumento,
                isActive,
                infoInstrumento,
                codigoIdentificacao,
                dataCalibracao,
                dataCalibracaoFormatada,
                dataProximaCalibracao,
                dataProximaCalibracaoFormatada,
                nomeEmpresaCalibrou,
                cnpjEmpresaCalibrou,
                created_at,
                updated_at,
                deleted_at,
            } = req.body
            console.log(req.body)
            await knex('calibration_control').insert({
                id,
                nomeInstrumento,
                isActive,
                infoInstrumento,
                codigoIdentificacao,
                dataCalibracao,
                dataCalibracaoFormatada,
                dataProximaCalibracao,
                dataProximaCalibracaoFormatada,
                nomeEmpresaCalibrou,
                cnpjEmpresaCalibrou,
                created_at,
                updated_at,
                deleted_at,
            })
            const calibration_control = {
                id,
                nomeInstrumento,
                isActive,
                infoInstrumento,
                codigoIdentificacao,
                dataCalibracao,
                dataCalibracaoFormatada,
                dataProximaCalibracao,
                dataProximaCalibracaoFormatada,
                nomeEmpresaCalibrou,
                cnpjEmpresaCalibrou,
                created_at,
                updated_at,
                deleted_at,
            }
            return res.status(201).json(calibration_control)
        } catch (error) {
            console.log(error)
            next(error)
        }
    },


    //funcao para atualizar um checklist
    async update(req: Request, res: Response, next: any) {
        console.log('atualizando controle de calibração ...')
        try {
            const {
                id,
                nomeInstrumento,
                isActive,
                infoInstrumento,
                codigoIdentificacao,
                dataCalibracao,
                dataCalibracaoFormatada,
                dataProximaCalibracao,
                dataProximaCalibracaoFormatada,
                nomeEmpresaCalibrou,
                cnpjEmpresaCalibrou,
                created_at,
                updated_at,
                deleted_at,
            } = req.body
            const { calibrationControlId } = req.params
            await knex('calibration_control')
                .update({
                    id,
                    nomeInstrumento,
                    isActive,
                    infoInstrumento,
                    codigoIdentificacao,
                    dataCalibracao,
                    dataCalibracaoFormatada,
                    dataProximaCalibracao,
                    dataProximaCalibracaoFormatada,
                    nomeEmpresaCalibrou,
                    cnpjEmpresaCalibrou,
                    created_at,
                    updated_at,
                    deleted_at,
                })
                .where({ id: calibrationControlId })
            return res.status(200).json('Controle de calibração editado com sucesso')
        } catch (error) {
            console.log(error)
            next(error)
        }
    },

    //funcao para apagar um checklist
    async delete(req: Request, res: Response, next: any) {

        try {
            const { calibrationControlId } = req.params

            await knex('calibration_control')
                .where({ id: calibrationControlId })
                .del()

            return res.status(200).json('Controle de calibração excluido com sucesso')
        } catch (error) {
            next(error)
        }
    },

}