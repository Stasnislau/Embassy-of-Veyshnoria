const visitService = require("../Services/visit.service");

import express, { Request, Response } from "express";

const Router = require("express").Router;
const visitRouter = new Router();
const authMiddleware = require("../MiddleWares/auth-middleware");

visitRouter.get("/specific/:id", authMiddleware, visitService.getVisitById);

visitRouter.get("/users", authMiddleware, visitService.getVisitsByUserId);

visitRouter.post("/create", authMiddleware, visitService.createVisit);

visitRouter.put("/update/:id", authMiddleware, visitService.updateVisit);

visitRouter.delete("/delete/:id", authMiddleware, visitService.deleteVisit);

module.exports = visitRouter;
