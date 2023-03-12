const VisitController = require("../Controllers/visit.controller");

import express, { Request, Response } from "express";

const Router = require("express").Router;
const visitRouter = new Router();
const authMiddleware = require("../MiddleWares/auth-middleware");

visitRouter.get("/specific/:id", authMiddleware, VisitController.getVisitById);

visitRouter.get("/users", authMiddleware, VisitController.getVisitsByUser);

visitRouter.post("/create", authMiddleware, VisitController.createVisit);

visitRouter.put("/update/:id", authMiddleware, VisitController.updateVisit);

visitRouter.delete("/delete/:id", authMiddleware, VisitController.deleteVisit);

module.exports = visitRouter;
