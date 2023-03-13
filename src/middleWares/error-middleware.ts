import { NextFunction, Request, Response } from "express";

import ApiError from "../exceptions/api-error";

interface ApiErrorInterface {
  status: number;
  message?: string;
  name: string;
}



const errorMiddleware = (
  err: ApiErrorInterface,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  console.error(err.status);
  return res.status(500).json({ error: `Unexpected error:  ${err.message}` });
};

export default errorMiddleware;
