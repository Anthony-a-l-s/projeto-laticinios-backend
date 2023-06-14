import { NextFunction, Request, Response } from "express";
import { decode, verify } from "jsonwebtoken";
const knex = require('../../knex/connection')
import { AppError } from "../../../errors/AppErrors";

type MyToken = {
    userId: string
    perfil: string
    iat: number
    exp: number
}


export async function ensureAuthenticate(request:Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing", 401);
        
    }

    const [, token] = authHeader.split(" ")

    try {
        //pegando o id do usuario a partir de token da authenticacao
        const {userId: userId}   = verify(token, "f968930f67be264f2c1bfb80adf27ba7") as MyToken

        console.log(userId)
        

        const loginVerification = await knex.select('*').from('users').where({ userId });

        //console.log(loginVerification)

        if (!loginVerification) {
            throw new AppError("User doesn't exists", 401);
            
        }

       next();
    } catch {
        throw new AppError("Invalid token", 401);
    }

}