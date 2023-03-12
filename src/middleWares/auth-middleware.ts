import { Request, Response } from "express";

import { NextFunction } from "express";

const jwt = require("jsonwebtoken");
const ApiError = require("../exceptions/api-error");

const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.unauthorized());
    }
    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.unauthorized());
    }
    const userData = jwt.verify(accessToken, process.env.SECRET_KEY);
    req.user = userData;
    next();
  } catch (e) {
    next(ApiError.unauthorized());
  }
};

module.exports = authMiddleware;
