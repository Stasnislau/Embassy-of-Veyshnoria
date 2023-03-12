import { NextFunction, Request, Response } from "express";

import { validationResult } from "express-validator";

const residencePermitApplicationService = require("../Services/residencePermitApplication.service");

const ApiError = require("../exceptions/api-error");

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
          comments
        );
      if (!residencePermitApplication) {
        throw ApiError.badRequest(
          "ResidencePermitApplication has not been created"
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
      const { userId } = req.body;
      const residencePermitApplications =
        await residencePermitApplicationService.getResidencePermitApplicationsByUserId(
          userId
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
          comments
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
      const residencePermitApplication =
        await residencePermitApplicationService.deleteResidencePermitApplication(
          id
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

module.exports = new ResidencePermitApplicationController();
