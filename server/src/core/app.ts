import cors from "cors";

import { Express, Response,NextFunction, Router } from "express";

import bodyParser from "body-parser";
import router from "../routes/index";

const createApp = (app: Express) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true, }));
    app.use(cors({
        credentials: true,
    }));
    app.use(function (_, res:Response, next:NextFunction) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Credentials', "true");
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    });
    const RouterInstance = Router()
    app.use(router(RouterInstance))
}

export default createApp;