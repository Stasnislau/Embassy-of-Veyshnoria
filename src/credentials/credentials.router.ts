import * as CredentialsService from "./credentials.service";

import { body, validationResult } from "express-validator";
import express, { Request, Response } from "express";

import { authenticateToken } from "./../../Authentication/authentication.middleware";

export const credentialsRouter = express.Router();
  
credentialsRouter.get(
  "/credentials/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const credentials = await CredentialsService.getCredentialsById(Number(id));
    res.json(credentials);
  }
);

credentialsRouter.get(
  "/credentials/users/:userId",
  authenticateToken,
  async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const credentials = await CredentialsService.getCredentialsById(
      Number(userId)
    );
    res.json(credentials);
  }
);

credentialsRouter.post(
  "/credentials",
  authenticateToken,
  async (req: Request, res: Response) => {
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
      return res.status(400).json({ errors: Errors.array() });
    }
    try {
      const credentials = await CredentialsService.createCredentials(req.body);
      res.json(credentials);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }
);

credentialsRouter.put(
  "/credentials/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email, password } = req.body;
    const credentials = await CredentialsService.updateCredentials(Number(id), {
      email,
      password,
    });
    res.json(credentials);
  }
);
