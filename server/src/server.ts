import chalk from "chalk";
import express from "express";
import { Request, Response, NextFunction } from "express";
import handleError from "./utils/errorHandler";
import router from "./router/router";
import cors from "./middlewares/cors";
import logger from "./logger/loggerService";

const app = express();

app.use(cors);
app.use(logger);

app.use(express.json());
app.use(express.text());
app.use(express.static("./public"));
app.use(router);

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.use((
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = error?.statusCode ?? error?.status ?? 500;
    const message = error?.message ?? "Internal Server Error";
    return handleError(res, statusCode, message);
});

const PORT = process.env.PORT || 8181;

app.listen(PORT, () => {
    console.log(chalk.green(`Server is running on http://localhost:${PORT}`));
});