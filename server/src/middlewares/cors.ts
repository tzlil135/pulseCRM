import cors from "cors";
import config from "config";

const allowedOrigins = config.get<string[]>("ORIGIN");

const corsMiddleware = cors({
    origin: allowedOrigins,
    optionsSuccessStatus: 200,
});

export default corsMiddleware;