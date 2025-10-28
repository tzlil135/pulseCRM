import mongoose from "mongoose";
import chalk from "chalk";

mongoose.connect("mongodb://localhost:27017/pulseCRM")
    .then(() => {
        console.log(chalk.bgMagenta("Connected to MongoDB locally"));
    })
    .catch((error) => {
        console.error(chalk.bgRed("Failed to connect to MongoDB locally"), error);
    });
