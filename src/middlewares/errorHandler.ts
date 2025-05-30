import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const message =
    err instanceof ApiError ? err.message : "Internal server error";

  console.error("[Error Handler]", {
    path: req.path,
    method: req.method,
    message: err.message,
    stack: err.stack,
  });

  res.status(statusCode).json({ error: message });
}
