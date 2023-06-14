import { AppError } from "../../shared/errors/AppErrors";
import { Request, Response } from "express";
const knex = require('../../shared/infra/knex/connection');


interface IFiles {
    filename: string;
}

module.exports = {

    async create(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {
            const { responseId } = req.params;

            const images = req.files as IFiles[];

            //Verificando se uma imagem foi passado
            if (!req.files || Object.keys(req.files).length === 0) {
                throw new AppError("Nenhuma imagem foi seletionado");
            }

            //Mapeando os nomes dos aruivos
            const images_name = images.map((file) => file.filename);

            //Inserindo os nomes dos arqivos no banco ligando eles ao id da resposta
            images_name.map(async (imageFileName) => {
                await knex('responseImage').insert({
                    responseId,
                    imageFileName
                }).where({ responseId })             
            });


            return res.status(201).json("Imagem(s) salvo(s) com sucesso").send();
        } catch (error) {
            next(error)
        }
    }

}