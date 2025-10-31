import { RequestHandler } from "express";
import { morganLogger } from "./loggers/morganLogger";
import config from "config";

const LOGGER = config.get<string>("LOGGER");

let loggerMiddleware: RequestHandler;

if (LOGGER === "morgan") {
    loggerMiddleware = morganLogger;
} else {
    loggerMiddleware = (req, res, next) => next();
}

export default loggerMiddleware;
