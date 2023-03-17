import { Request, Response } from "express";

import ApiError from "../exceptions/api-error";
import { NextFunction } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.unauthorized());
    }
    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken || accessToken === "null") {
      return next(ApiError.unauthorized());
    }
    const userData = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!);

    req.user = userData;
    next();
  } catch (e) {
    next(ApiError.unauthorized());
  }
};

export default authMiddleware;
