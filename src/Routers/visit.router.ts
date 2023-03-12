import * as visitService from "../Services/visit.service";

import { body, validationResult } from "express-validator";
import express, { Request, Response } from "express";

export const visitRouter = express.Router();

visitRouter.get(
  "/specific/:id",

  async (req: Request, res: Response) => {
    const id = req.params.id;
    const visit = await visitService.getVisitById(Number(id));
    res.json(visit);
  }
);

visitRouter.get(
  "/users",

  async (req: any, res: Response) => {
    const userId = req.user.id;
    try {
      const visits = await visitService.getVisitsByUserId(Number(userId));
      res.json(visits);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }
);

visitRouter.post("/", async (req: Request, res: Response) => {
  const Errors = validationResult(req);
  if (!Errors.isEmpty()) {
    return res.status(400).json({ errors: Errors.array() });
  }
  try {
    const visit = await visitService.createVisit(req.body);
    res.json(visit);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});
