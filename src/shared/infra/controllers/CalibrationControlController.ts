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
        try {
            const {
                instrument_name,
                active,
                ifnfo_isntrument,
                identification_code,
                calibration_date,
                formatted_calibration_date,
                next_calibration_date,
                next_formatted_calibration_date,
                calibrated_company_name,
                cnpj_calibrated_company
            } = req.body

            await knex('calibration_control').insert({
                instrument_name,
                active,
                ifnfo_isntrument,
                identification_code,
                calibration_date,
                formatted_calibration_date,
                next_calibration_date,
                next_formatted_calibration_date,
                calibrated_company_name,
                cnpj_calibrated_company
            })
            const calibration_control = {
                instrument_name,
                active,
                ifnfo_isntrument,
                identification_code,
                calibration_date,
                formatted_calibration_date,
                next_calibration_date,
                next_formatted_calibration_date,
                calibrated_company_name,
                cnpj_calibrated_company
            }
            return res.status(201).json(calibration_control)
        } catch (error) {
            next(error)
        }
    },


    //funcao para atualizar um checklist
    async update(req: Request, res: Response, next: any) {
        try {
            const { 
                instrument_name,
                active,
                ifnfo_isntrument,
                identification_code,
                calibration_date,
                formatted_calibration_date,
                next_calibration_date,
                next_formatted_calibration_date,
                calibrated_company_name,
                cnpj_calibrated_company 
            } = req.body
            const { calibrationControlId } = req.params
            await knex('calibration_control')
                .update({
                    instrument_name,
                    active,
                    ifnfo_isntrument,
                    identification_code,
                    calibration_date,
                    formatted_calibration_date,
                    next_calibration_date,
                    next_formatted_calibration_date,
                    calibrated_company_name,
                    cnpj_calibrated_company

                })
                .where({ id: calibrationControlId })
            return res.status(200).json('Controle de calibração editado com sucesso')
        } catch (error) {
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