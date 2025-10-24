import chalk from "chalk";
import morgan from "morgan";
import { dateTimeStr } from "../../utils/dateTimeStr";

export const morganLogger = morgan((tokens, req, res) => {
    const status = Number(tokens.status(req, res));
    const logReturn = [
        chalk.gray(dateTimeStr()),
        chalk.cyan(tokens.method(req, res)),
        chalk.green(tokens["response-time"](req, res) + " ms"),
        chalk.magenta(tokens.url(req, res))
    ].join(" ");
    return (status >= 400 ? chalk.redBright : chalk.white)(logReturn);
});