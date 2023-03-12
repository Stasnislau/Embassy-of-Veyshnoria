import { body, validationResult } from "express-validator";
import express, { Request, Response } from "express";

const authMiddleware = require("../MiddleWares/auth-middleware");
const visaApplicationService = require("../Services/visaApplication.service");
export const visaApplicationRouter = express.Router();

visaApplicationRouter.get(
  "/specific/:id",
  authMiddleware,
  visaApplicationService.getVisaApplicationById()
);

visaApplicationRouter.get(
  "/users",
  authMiddleware,
  visaApplicationService.getVisaApplicationsByUserId()
);

visaApplicationRouter.post(
  "/create",
  authMiddleware,
  visaApplicationService.createVisaApplication()
);

visaApplicationRouter.put(
  "/update/:id",
  authMiddleware,
  visaApplicationService.updateVisaApplication()
);

visaApplicationRouter.delete(
  "/delete/:id",
  authMiddleware,
  visaApplicationService.deleteVisaApplication()
);
