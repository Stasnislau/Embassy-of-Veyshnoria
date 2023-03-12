import { NextFunction, Request, Response } from "express";

interface Error {
  status: number;
  message?: string;
}

const ApiError = require("../exceptions/api-error");

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err instanceof ApiError, "PROBLEMATIC LOG"); // should be true, but it's false :(

  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  console.error(err.status);
  return res.status(500).json({ error: `Unexpected error:  ${err.message}` });
};

module.exports = errorMiddleware;
