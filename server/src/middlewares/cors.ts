import cors from "cors";

const corsMiddleware = cors({
    origin: ["http://localhost:5173"],
    optionsSuccessStatus: 200,
});

export default corsMiddleware;