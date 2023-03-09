const jwt = require("jsonwebtoken");

import { NextFunction, Request, Response } from "express";

export const authenticateToken = (req: any , res: any, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, user : {
    userId: number;
  }) => {
    if (err as any) return res.sendStatus(403);
    req.user = user;
    next();
  });
};