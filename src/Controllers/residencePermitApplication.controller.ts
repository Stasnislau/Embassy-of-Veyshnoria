import { NextFunction, Request, Response } from "express";

import ApiError from "../exceptions/api-error";
import { ResidencePermitApplicationsInterface } from "../Interfaces";
import jwt from "jsonwebtoken";
import residencePermitApplicationService from "../Services/residencePermitApplication.service";
import { validationResult } from "express-validator";

class ResidencePermitApplicationController {
  createResidencePermitApplication = async (
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
        residencePermitType,
        comments,
      } = req.body;
      const residencePermitApplication =
        await residencePermitApplicationService.createResidencePermitApplication(
          {
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
            residencePermitType,
            comments,
          } as ResidencePermitApplicationsInterface,
          userId
        );
      if (!residencePermitApplication) {
        throw ApiError.badRequest(
          "Residence Permit Application has not been created"
        );
      }
      return res.json({ residencePermitApplication });
    } catch (error: any) {
      next(error);
    }
  };

  getResidencePermitApplicationsByUser = async (
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
      const residencePermitApplications =
        await residencePermitApplicationService.getResidencePermitApplicationsByUserId(
          user.id
        );
      if (!residencePermitApplications) {
        throw ApiError.badRequest("Residence permit applications not found");
      }
      return res.json({ residencePermitApplications });
    } catch (error: any) {
      next(error);
    }
  };

  getResidencePermitApplicationById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.body;
      const residencePermitApplication =
        await residencePermitApplicationService.getResidencePermitApplicationById(
          id
        );
      if (!residencePermitApplication) {
        throw ApiError.badRequest("Residence permit application not found");
      }
      return res.json({ residencePermitApplication });
    } catch (error: any) {
      next(error);
    }
  };

  updateResidencePermitApplication = async (
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
        residencePermitType,
        comments,
      } = req.body;
      const residencePermitApplication =
        await residencePermitApplicationService.updateResidencePermitApplication(
          id,
          {
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
            residencePermitType,
            comments,
          } as ResidencePermitApplicationsInterface
        );
      if (!residencePermitApplication) {
        throw ApiError.badRequest(
          "ResidencePermitApplication has not been updated"
        );
      }
      return res.json({ residencePermitApplication });
    } catch (error: any) {
      next(error);
    }
  };

  deleteResidencePermitApplication = async (
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
      const residencePermitApplication =
        await residencePermitApplicationService.deleteResidencePermitApplication(
          id,
          user.id
        );
      if (!residencePermitApplication) {
        throw ApiError.badRequest("the application has not been deleted");
      }
      return res.json({ residencePermitApplication });
    } catch (error: any) {
      next(error);
    }
  };
}

export default new ResidencePermitApplicationController();
