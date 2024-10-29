import { logger } from "../utils/logger.js";

export const errorHandle = (err, _req, res, _next) => {
  const status = err.status || 500;
  logger.error(`${err.path} ${err.message}`);
  const message = status === 500 ? "Internal server error" : err.message;
  res.status(status).json({ status: "error", error: message });
};
