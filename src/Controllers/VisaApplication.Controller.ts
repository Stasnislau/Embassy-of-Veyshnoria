import { NextFunction, Request, Response } from "express";

import ApiError from "../exceptions/api-error";
import { VisaApplicationInterface } from "../Interfaces";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import visaService from "../Services/visaApplication.service";

class VisaApplicationController {
  createVisaApplication = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest("Validation error"));
      }
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
      const {
        name,
        surname,
        birthDate,
        birthPlace,
        phoneNumber,
        address,
        city,
        country,
        zip,
        passportNumber,
        passportIssuingDate,
        passportExpirationDate,
        passportIssuingCountry,
        visaType,
        visaDuration,
        visaDate,
        comments,
      } = req.body;
      const visaApplication = await visaService.createVisaApplication(user.id, {
        name,
        surname,
        birthDate,
        birthPlace,
        phoneNumber,
        address,
        city,
        country,
        zip,
        passportNumber,
        passportIssuingDate,
        passportExpirationDate,
        passportIssuingCountry,
        visaType,
        visaDuration,
        visaDate,
        comments,
      } as VisaApplicationInterface);
      if (!visaApplication) {
        throw ApiError.badRequest("VisaApplication has not been created");
      }
      return res.json({ visaApplication });
    } catch (error: any) {
      next(error);
    }
  };

  getVisaApplicationsByUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
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
      const visaApplications = await visaService.getVisaApplicationsByUserId(
        user.id
      );
      return res.json({ visaApplications });
    } catch (error: any) {
      next(error);
    }
  };

  getVisaApplicationById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.body;
      const visaApplication = await visaService.getVisaApplicationById(id);
      return res.json({ visaApplication });
    } catch (error: any) {
      next(error);
    }
  };

  updateVisaApplication = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest("Validation error"));
      }
      const {
        id,
        name,
        surname,
        birthDate,
        birthPlace,
        phoneNumber,
        address,
        city,
        country,
        zip,
        passportNumber,
        passportIssuingDate,
        passportExpirationDate,
        passportIssuingCountry,
        visaType,
        visaDuration,
        visaDate,
        comments,
      } = req.body;
      const visaApplication = await visaService.updateVisaApplication(id, {
        name,
        surname,
        birthDate,
        birthPlace,
        phoneNumber,
        address,
        city,
        country,
        zip,
        passportNumber,
        passportIssuingDate,
        passportExpirationDate,
        passportIssuingCountry,
        visaType,
        visaDuration,
        visaDate,
        comments,
      } as VisaApplicationInterface);
      return res.json({ visaApplication });
    } catch (error: any) {
      next(error);
    }
  };

  deleteVisaApplication = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.body;
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
      const visaApplication = await visaService.deleteVisaApplication(
        id,
        user.id
      );
      return res.json({ visaApplication });
    } catch (error: any) {
      next(error);
    }
  };
}

export default new VisaApplicationController();
