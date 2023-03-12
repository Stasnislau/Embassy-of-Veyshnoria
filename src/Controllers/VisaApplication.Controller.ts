import { NextFunction, Request, Response } from "express";

import { validationResult } from "express-validator";

const visaService = require("../Services/visa.service");

const ApiError = require("../exceptions/api-error");

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
      const {
        userId,
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
      const visaApplication = await visaService.createVisaApplication(
        userId,
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
        comments
      );
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
      const { userId } = req.body;
      const visaApplications = await visaService.getVisaApplicationsByUserId(
        userId
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
      const visaApplication = await visaService.updateVisaApplication(
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
        comments
      );
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
      const visaApplication = await visaService.deleteVisaApplication(id);
      return res.json({ visaApplication });
    } catch (error: any) {
      next(error);
    }
  };
}
