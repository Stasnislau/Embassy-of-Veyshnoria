import express, { Request, Response } from "express";

import authMiddleware from "../MiddleWares/auth-middleware";
import residencePermitApplicationController from "../Controllers/residencePermitApplication.controller";

const Router = require("express").Router;
const residencePermitApplicationRouter = new Router();

residencePermitApplicationRouter.get(
  "/specific/:id",
  authMiddleware,
  residencePermitApplicationController.getResidencePermitApplicationById
);

residencePermitApplicationRouter.get(
  "/users",
  authMiddleware,
  residencePermitApplicationController.getResidencePermitApplicationsByUser
);

residencePermitApplicationRouter.post(
  "/create",
  authMiddleware,
  residencePermitApplicationController.createResidencePermitApplication
);

residencePermitApplicationRouter.put(
  "/update/:id",
  authMiddleware,
  residencePermitApplicationController.updateResidencePermitApplication
);

residencePermitApplicationRouter.delete(
  "/delete/:id",
  authMiddleware,
  residencePermitApplicationController.deleteResidencePermitApplication
);

export default residencePermitApplicationRouter;
