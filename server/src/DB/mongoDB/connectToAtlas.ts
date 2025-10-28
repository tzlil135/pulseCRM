import mongoose from "mongoose";
import chalk from "chalk";

mongoose.connect('mongodb+srv://pulsecrm_user:Tzl135Tzl135@cluster1.vou4qaw.mongodb.net/')
    .then(() => {
        console.log(chalk.bgGreenBright("Connected to MongoDB Atlas"));
    })
    .catch((error) => {
        console.error(chalk.bgRed("Failed to connect to MongoDB Atlas"), error);
    });
