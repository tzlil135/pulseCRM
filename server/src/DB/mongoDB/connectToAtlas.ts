import mongoose from "mongoose";
import chalk from "chalk";
import config from "config";

const user = config.get<string>("DB_USER");
const password = config.get<string>("DB_PASSWORD");

mongoose.connect(`mongodb+srv://${user}:${password}@cluster1.vou4qaw.mongodb.net/`)
    .then(() => {
        console.log(chalk.bgGreenBright("Connected to MongoDB Atlas"));
    })
    .catch((error) => {
        console.error(chalk.bgRed("Failed to connect to MongoDB Atlas"), error);
    });
