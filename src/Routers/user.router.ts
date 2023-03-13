const Router = require("express").Router;

import UserController from "../Controllers/user.controller";
import authMiddleware from "../MiddleWares/auth-middleware";
import { body } from "express-validator";

const router = new Router();
router.post(
  "/registration",
  body("email").isEmail(),
  UserController.registration
);

router.post("/login", UserController.login);
router.post("/logout", UserController.logout);

router.get("/refresh", UserController.refresh);

export default router;
