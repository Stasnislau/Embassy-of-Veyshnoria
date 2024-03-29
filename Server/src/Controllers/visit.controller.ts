import { NextFunction, Request, Response } from "express";

import ApiError from "../Exceptions/api-error";
import { VisitInterface } from "../Interfaces";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import visitService from "../Services/visit.service";

class VisitController {
  createVisit = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers && req.headers.authorization;
      if (!authHeader) {
        return next(ApiError.unauthorized());
      }
      const user: {
        id: string;
        email: string;
      } = jwt.decode(authHeader.split(" ")[1]) as {
        id: string;
        email: string;
      };
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest("Validation error"));
      }
      const { date, time, location, description } = req.body;
      const visit = await visitService.createVisit({
        date,
        time,
        location,
        description,
        userId: Number(user.id),
      } as VisitInterface);
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
      const user: {
        id: string;
        email: string;
      } = jwt.decode(authHeader.split(" ")[1]) as {
        id: string;
        email: string;
      };
      const visits = await visitService.getVisitsByUserId(user.id);
      return res.json(visits);
    } catch (error: any) {
      next(error);
    }
  };

  getVisitById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const visit = await visitService.getVisitById(id);
      return res.json(visit);
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
      const id = req.params.id;
      const { date, time, location, description } = req.body;
      const visit = await visitService.updateVisit(
        { date, time, location, description } as VisitInterface,
        Number(id)
      );
      return res.json({ visit });
    } catch (error: any) {
      next(error);
    }
  };

  deleteVisit = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const authHeader = req.headers && req.headers.authorization;
      if (!authHeader) {
        return next(ApiError.unauthorized());
      }
      const user: {
        id: string;
        email: string;
      } = jwt.decode(authHeader.split(" ")[1]) as {
        id: string;
        email: string;
      };
      const visit = await visitService.deleteVisit(id, user.id);
      return res.json({ visit });
    } catch (error: any) {
      next(error);
    }
  };
}

export default new VisitController();
