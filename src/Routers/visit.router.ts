const visitService = require("../Services/visit.service");

import { body, validationResult } from "express-validator";
import express, { Request, Response } from "express";

const authMiddleware = require("../MiddleWares/auth-middleware");
export const visitRouter = express.Router();

visitRouter.get("/specific/:id", authMiddleware);

visitRouter.get("/users", authMiddleware, visitService.getVisitsByUserId());

visitRouter.post("/create", authMiddleware, visitService.createVisit());

visitRouter.put("/update/:id", authMiddleware, visitService.updateVisit());

visitRouter.delete("/delete/:id", authMiddleware, visitService.deleteVisit());
