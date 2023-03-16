import { NextFunction, Request, Response } from "express";
import { UserDTOInterface, UserInterface } from "../Interfaces";

import ApiError from "../exceptions/api-error";
import jwt from "jsonwebtoken";
import userService from "../Services/user.service";
import { validationResult } from "express-validator";

interface RequestInterface extends Request {
  body: any;
  clearCookie: any;
}
interface ResponseInterface extends Response {
  json: any;
  status: any;
  cookie: any;
}

class UserController {
  registration = async (
    req: RequestInterface,
    res: ResponseInterface,
    next: NextFunction
  ) => {
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
    } catch (error: any) {
      next(error);
    }
  };

  login = async (
    req: RequestInterface,
    res: ResponseInterface,
    next: NextFunction
  ) => {
    try {
      const { email, password } = req.body;
      const user = await userService.login(email, password);
      res.cookie("refreshToken", user.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json({ user });
    } catch (error: any) {
      next(error);
    }
  };

  logout = async (req: RequestInterface, res: any, next: NextFunction) => {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (error: any) {
      next(error);
    }
  };

  refresh = async (
    req: RequestInterface,
    res: ResponseInterface,
    next: NextFunction
  ) => {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error: any) {
      next(error);
    }
  };

  getUser = async (
    req: RequestInterface,
    res: ResponseInterface,
    next: NextFunction
  ) => {
    const authHeader = req.headers && req.headers.authorization;
    if (!authHeader) {
      return next(ApiError.unauthorized());
    }
    const user: {
      id: string;
      email: string;
    } = jwt.decode(authHeader.split(" ")[1]) as {
      id: string;
      email: string;
    };
    const userData = await userService.getUser(user.id);
    return res.json({ userData });
  };

  updateUser = async (
    req: RequestInterface,
    res: ResponseInterface,
    next: NextFunction
  ) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest("Validation error"));
      }
      const authHeader = req.headers && req.headers.authorization;
      if (!authHeader) {
        return next(ApiError.unauthorized());
      }
      const user: {
        id: string;
        email: string;
      } = jwt.decode(authHeader.split(" ")[1]) as {
        id: string;
        email: string;
      };
      const newData = req.body as UserInterface;
      userService.updateUser(user.id, newData);
    } catch (error: any) {
      next(error);
    }
  };

  updatePassword = async (
    req: RequestInterface,
    res: ResponseInterface,
    next: NextFunction
  ) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest("Validation error"));
      }
      const user = req.body as {
        email: string;
        password: string;
      };

      const success = await userService.updatePassword(
        user.email,
        user.password
      );
      if (!success) {
        throw ApiError.badRequest("Password was not updated, wrong data");
      }
      return res.json(Boolean(success));
    } catch (error: any) {
      return res.json(false);
    }
  };

  getUserDTOByEmail = async (
    req: RequestInterface,
    res: ResponseInterface,
    next: NextFunction
  ) => {
    const email = req.params.email;
    const user = await userService.getShortUserByEmail(email);
    return res.json(user);
  };
}

export default new UserController();
