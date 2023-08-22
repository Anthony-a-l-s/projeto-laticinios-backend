import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
const knex = require('../../knex/connection')
import { AppError } from "../../../errors/AppErrors";

type MyToken = {
    userId: string
    perfil: string
    iat: number
    exp: number
}


export async function ensureResponsavelFisico(request:Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing", 401);
        
    }

    const [, token] = authHeader.split(" ")

    /*try {
        const {perfil: perfilUsuario}   = verify(token, "f968930f67be264f2c1bfb80adf27ba7") as MyToken

        console.log(perfilUsuario)

        const {userId: userId}   = verify(token, "f968930f67be264f2c1bfb80adf27ba7") as MyToken

        console.log(userId)

        let pessoaFisicaCpf = await knex.select('cpf').from('naturalPerson').where({ userId })
        
        console.log(pessoaFisicaCpf)

        if (perfilUsuario != "Responsavel Técnico") {
            console.log("Acces denied for not Responsavel Técnico user")
          throw new AppError("Acces denied for not Auditor fiscal user", 401);
        }

        if (!pessoaFisicaCpf) {
            console.log("Acces denied for not Responsavel Técnico fisico user")
            throw new AppError("Incorrect email or password");
        }

       next();
    } catch {
        throw new AppError("Invalid token", 401);
    }*/
       
    try {
        const {perfil: perfilUsuario}   = verify(token, "f968930f67be264f2c1bfb80adf27ba7") as MyToken

        console.log(perfilUsuario)
        

        if (perfilUsuario != "Responsavel Técnico Física") {
            console.log("Acces denied for not Responsavel Técnico user")
          throw new AppError("Acces denied for not Auditor fiscal user", 401);
        }

       next();
    } catch {
        throw new AppError("Invalid token", 401);
    }
}
