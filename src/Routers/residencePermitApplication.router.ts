const residencePermitApplicationService = require("../Services/residencePermitApplication.service");

import express, { Request, Response } from "express";

const authMiddleware = require("../MiddleWares/auth-middleware");

export const residencePermitApplicationRouter = express.Router();

residencePermitApplicationRouter.get(
  "/specific/:id",
  authMiddleware,
  residencePermitApplicationService.getResidencePermitApplicationById()
);

residencePermitApplicationRouter.get(
  "/users/:userId",
  authMiddleware,
  residencePermitApplicationService.getResidencePermitApplicationsByUserId()
);

residencePermitApplicationRouter.post(
  "/create",
  authMiddleware,
  residencePermitApplicationService.createResidencePermitApplication()
);

residencePermitApplicationRouter.put(
  "/update/:id",
  authMiddleware,
  residencePermitApplicationService.updateResidencePermitApplication()
);
