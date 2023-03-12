import express, { Request, Response } from "express";

const residencePermitApplicationController = require("../Controllers/residencePermitApplication.controller");

const authMiddleware = require("../MiddleWares/auth-middleware");

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

module.exports = residencePermitApplicationRouter;
