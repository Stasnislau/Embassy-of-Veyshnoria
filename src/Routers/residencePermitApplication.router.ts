import express, { Request, Response } from "express";

const residencePermitApplicationService = require("../Services/residencePermitApplication.service");

const authMiddleware = require("../MiddleWares/auth-middleware");

const Router = require("express").Router;
const residencePermitApplicationRouter = new Router();

residencePermitApplicationRouter.get(
  "/specific/:id",
  authMiddleware,
  residencePermitApplicationService.getResidencePermitApplicationById
);

residencePermitApplicationRouter.get(
  "/users/:userId",
  authMiddleware,
  residencePermitApplicationService.getResidencePermitApplicationsByUserId
);

residencePermitApplicationRouter.post(
  "/create",
  authMiddleware,
  residencePermitApplicationService.createResidencePermitApplication
);

residencePermitApplicationRouter.put(
  "/update/:id",
  authMiddleware,
  residencePermitApplicationService.updateResidencePermitApplication
);

residencePermitApplicationRouter.delete(
  "/delete/:id",
  authMiddleware,
  residencePermitApplicationService.deleteResidencePermitApplication
);

module.exports = residencePermitApplicationRouter;
