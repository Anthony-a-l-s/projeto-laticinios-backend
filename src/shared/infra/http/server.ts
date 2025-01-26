import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
const routes = require("../routes")

import cors from 'cors';
import bodyParser from "body-parser";
import { AppError } from "../../errors/AppErrors";
const createAdmin = require('../../infra/seed/admin')


const app = express();

app.use(express.json());



app.use(routes);

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message
        });
    }

    return res.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`,
    });
} );

app.listen(3307, () => console.log("Server running in port 3307"));
