import * as visaApplicationService from "./visaApplication.service";

import { body, validationResult } from "express-validator";
import express, { Request, Response } from "express";

import { authenticateToken } from "../../Authentication/authentication.middleware";

export const visaApplicationRouter = express.Router();

visaApplicationRouter.get(
  "/specific/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const visaApplication = await visaApplicationService.getVisaApplicationById(
      Number(id)
    );
    res.json(visaApplication);
  }
);

visaApplicationRouter.get(
  "/users",
  authenticateToken,
  async (req: any, res: Response) => {
    console.log(req.user);
    const userId = req.user.id;
    try {
      const visaApplications =
        await visaApplicationService.getVisaApplicationsByUserId(
          Number(userId)
        );
      res.json(visaApplications);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }
);

visaApplicationRouter.post("/", async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  const Errors = validationResult(req);
  if (!Errors.isEmpty()) {
    return res.status(400).json({ errors: Errors.array() });
  }
  try {
    const visaApplication = await visaApplicationService.createVisaApplication(
      userId,
      req.body
    );
    res.json(visaApplication);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

visaApplicationRouter.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId, ...rest } = req.body;
  const visaApplication = await visaApplicationService.updateVisaApplication(
    Number(id),
    rest
  );
  res.json(visaApplication);
});
