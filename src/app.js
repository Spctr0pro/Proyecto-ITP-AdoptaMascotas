import express from "express";
import cookieParser from "cookie-parser";
import router from "./routes/index.js";

import { errorHandle } from "./errors/errHandle.js";
import { logger } from "./utils/logger.js";
import paths from "./utils/paths.js";
import { config as configDotenv } from "./config/dotenv.config.js";
import { connectDB } from "./config/mongoose.config.js";
import swaggerUiExpress from "swagger-ui-express";
import { specs } from "./config/swagger.config.js";



const app = express();

configDotenv(paths);
connectDB();


const PORT = process.env.PORT || 8080;
// const connection = mongoose.connect(process.env.MONGODB_URI);

app.use(express.json());
app.use(cookieParser());
app.use("/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

app.use("/api", router);

// Middleware de manejo de errores
app.use(errorHandle);

app.listen(PORT, () => {
    logger.info(`Listening on ${PORT}`)
    console.log(`Ejecutándose en http://localhost:${PORT}`);
});
