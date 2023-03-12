import { NextFunction, request, response } from "express";

import { validationResult } from "express-validator";

const userService = require("../Services/user.service");
const ApiError = require("../exceptions/api-error");
const cookieParser = require("cookie-parser");
interface Request {
  body: any;
}
interface Response {
  json: any;
  status: any;
  cookie: any;
}

class UserController {
  registration = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest("Validation error"));
      }
      const { name, surname, email, password } = req.body;
      const user = await userService.registration(
        name,
        surname,
        email,
        password
      );
      res.cookie("refreshToken", user.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json({ user });
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const user = await userService.login(email, password);
      res.cookie("refreshToken", user.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json({ user });
    } catch (error) {
      next(error);
    }
  };

  logout = async (req: any, res: any, next: NextFunction) => {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (error) {
      next(error);
    }
  };

  refresh = async (req: any, res: any, next: NextFunction) => {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new UserController();
