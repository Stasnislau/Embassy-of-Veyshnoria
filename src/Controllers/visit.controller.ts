import { NextFunction, Request, Response } from "express";

import { validationResult } from "express-validator";

const visitService = require("../Services/visit.service");
const jwt = require("jsonwebtoken");

const ApiError = require("../exceptions/api-error");

class VisitController {
  createVisit = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest("Validation error"));
      }
      const { userId, date, time, location, description } = req.body;
      const visit = await visitService.createVisit(
        userId,
        date,
        time,
        location,
        description
      );
      return res.json({ visit });
    } catch (error: any) {
      next(error);
    }
  };

  getVisitsByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers && req.headers.authorization;
      if (!authHeader) {
        return next(ApiError.unauthorized());
      }
      const user = jwt.decode(authHeader.split(" ")[1]);
      const visits = await visitService.getVisitsByUserId(user.id);
      return res.json({ visits });
    } catch (error: any) {
      next(error);
    }
  };

  getVisitById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.body;
      const visit = await visitService.getVisitById(id);
      return res.json({ visit });
    } catch (error: any) {
      next(error);
    }
  };

  updateVisit = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest("Validation error"));
      }
      const { id, date, time, location, description } = req.body;
      const visit = await visitService.updateVisit(
        id,
        date,
        time,
        location,
        description
      );
      return res.json({ visit });
    } catch (error: any) {
      next(error);
    }
  };

  deleteVisit = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.body;
      const authHeader = req.headers && req.headers.authorization;
      if (!authHeader) {
        return next(ApiError.unauthorized());
      }
      const user = jwt.decode(authHeader.split(" ")[1]);
      const visit = await visitService.deleteVisit(id, user.id);
      return res.json({ visit });
    } catch (error: any) {
      next(error);
    }
  };
}

module.exports = new VisitController();
