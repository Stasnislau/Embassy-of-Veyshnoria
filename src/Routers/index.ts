const Router = require("express").Router;
const { body } = require("express-validator");
const UserController = require("../Controllers/user.controller");

const router = new Router();
router.post(
  "/registration",
  body("email").isEmail(),
  UserController.registration
);

router.post("/login", UserController.login);
router.post("/logout", UserController.logout);

router.get("/refresh", UserController.refresh);

module.exports = router;
