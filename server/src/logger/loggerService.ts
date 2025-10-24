
import { RequestHandler } from "express";
import { morganLogger } from "./loogers/morganLogger";

const LOGGER = "morgan";

let loggerMiddleware: RequestHandler;

if (LOGGER === "morgan") {
    loggerMiddleware = morganLogger;
} else {
    loggerMiddleware = (req, res, next) => next();
}

export default loggerMiddleware;
