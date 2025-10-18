import chalk from "chalk";
import { Response } from "express";

const handleError = (
    res: Response,
    statusCode: number = 500,
    message: string = 'Internal Server Error'
) => {
    console.error(chalk.red(`Error: ${message}`));
    res.status(statusCode).json({ error: message });
};

export default handleError;