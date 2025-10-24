import express from "express";
const app = express();
import cors from "cors";

app.use(cors(
    {
        origin: ["http://localhost:5173/"],
        optionsSuccessStatus: 200
    }
));

export default app;