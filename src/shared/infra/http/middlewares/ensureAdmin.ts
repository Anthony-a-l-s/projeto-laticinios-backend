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


export async function ensureAdmin(request:Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing", 401);
        
    }

    const [, token] = authHeader.split(" ")

    try {
        const {userId: userId}   = verify(token, "f968930f67be264f2c1bfb80adf27ba7") as MyToken

        //console.log(userId)
        

        const loginVerification = await knex.select('*').from('users').where({ userId });

        console.log(loginVerification)

        if (!loginVerification) {
            throw new AppError("User doesn't exists", 401);
        }

        const loginId = loginVerification[0].loginId;

        const email = await knex.select('email').from('login').where({loginId: loginId})

        console.log(email[0].email)

        if (email[0].email != "habiroumama@gmail.com") {
          throw new AppError("Acces denied for not admin user", 401);
        }

       next();
    } catch {
        throw new AppError("Invalid token", 401);
    }

}
