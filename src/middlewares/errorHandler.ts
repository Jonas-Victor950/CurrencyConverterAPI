import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { logger } from "../utils/logger";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const message =
    err instanceof ApiError ? err.message : "Internal server error";

  logger.error({
    path: req.path,
    method: req.method,
    statusCode,
    message,
    stack: err.stack,
  });

  res.status(statusCode).json({ error: message });
}
