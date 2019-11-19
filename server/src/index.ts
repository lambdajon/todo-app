import { createServer, Server } from "http";

import dotenv from "dotenv";

import express, { Application } from "express";

import createApp from "./core/app";
import "./core/db";

const app = express();
const http: Server = createServer(app);

dotenv.config();

createApp(app)

http.listen(process.env.PORT, function () {
    console.log(`Server: http://localhost:${process.env.PORT}`);
});