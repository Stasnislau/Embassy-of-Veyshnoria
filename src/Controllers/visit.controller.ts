import { NextFunction, Request, Response } from "express";

import { validationResult } from "express-validator";

const visitService = require("../Services/user.service");

const ApiError = require("../exceptions/api-error");

const cookieParser = require("cookie-parser");

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
      const { userId } = req.body;
      const visits = await visitService.getVisitsByUserId(userId);
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
      const { Id, date, time, location, description } = req.body;
      const visit = await visitService.updateVisit(
        Id,
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
      const visit = await visitService.deleteVisit(id);
      return res.json({ visit });
    } catch (error: any) {
      next(error);
    }
  };
}

module.exports = new VisitController();
