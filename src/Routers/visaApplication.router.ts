import express, { Request, Response } from "express";

const authMiddleware = require("../MiddleWares/auth-middleware");
const visaApplicationController = require("../Controllers/visaApplication.controller");
const Router = require("express").Router;
const visaApplicationRouter = new Router();

visaApplicationRouter.get(
  "/specific/:id",
  authMiddleware,
  visaApplicationController.getVisaApplicationById
);

visaApplicationRouter.get(
  "/users",
  authMiddleware,
  visaApplicationController.getVisaApplicationsByUser
);

visaApplicationRouter.post(
  "/create",
  authMiddleware,
  visaApplicationController.createVisaApplication
);

visaApplicationRouter.put(
  "/update/:id",
  authMiddleware,
  visaApplicationController.updateVisaApplication
);

visaApplicationRouter.delete(
  "/delete/:id",
  authMiddleware,
  visaApplicationController.deleteVisaApplication
);

module.exports = visaApplicationRouter;
