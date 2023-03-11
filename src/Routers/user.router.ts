import * as tokenService from "../Services/tokens.service";
import * as userService from "../User/user.service";

import { body, validationResult } from "express-validator";
import express, { Request, Response } from "express";

import { authenticateToken } from "../Authentication/authentication.middleware";
import { embassyDB } from "../utils/db.server";

export const userRouter = express.Router();

userRouter.get(
  "/specific/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = await userService.getUserById(Number(id));
    res.json(user);
  }
);

userRouter.post("/registration", async (req: Request, res: Response) => {
  const Errors = validationResult(req);
  if (!Errors.isEmpty()) {
    return res.status(400).json({ errors: Errors.array() });
  }
  try {
    await userService.createUser(req.body);
    const user = await embassyDB.users.findUnique({
      where: {
        email: req.body.email,
      },
      select: {
        id: true,
        email: true,
      },
    });
    if (!user) {
      throw new Error("User was not created");
    }
    const tokens = await tokenService.generateTokens( user, user.id);
    tokenService.saveToken(user.id, tokens.refreshToken);

    res.json(user);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

userRouter.post(
  "/logout",
  authenticateToken,
  async (req: Request, res: Response) => {
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
      return res.status(400).json({ errors: Errors.array() });
    }
    try {
      // const user = await userService.logoutUser(req.body);
      // res.json(user);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }
);

userRouter.put(
  "/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const Errors = validationResult(req);

    if (!Errors.isEmpty()) {
      return res.status(400).json({ errors: Errors.array() });
    }
    try {
      const user = await userService.updateUser(Number(id), req.body);
      return res.status(200).json(user);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }
);
