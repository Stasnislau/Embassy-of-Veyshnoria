const Router = require("express").Router;

import UserController from "../Controllers/user.controller";
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

router.get("/specific", UserController.getUser);
router.get("/dto/:email", UserController.getUserDTOByEmail);

router.put("/update/user", UserController.updateUser);

router.put("/update/password", UserController.updatePassword)



export default router;
