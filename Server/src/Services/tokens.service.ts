import { TokenInterface, UserDTOInterface, UserInterface } from "../Interfaces";

import ApiError from "../Exceptions/api-error";
import { embassyDB } from "../utils/db.server";
import jwt from "jsonwebtoken";

class tokenService {
  saveToken = async (userId: number, token: string) => {
    const tokenData = await embassyDB.tokens.findUnique({
      where: {
        userId: userId,
      },
    });
    if (tokenData) {
      await embassyDB.tokens.update({
        where: {
          userId: userId,
        },
        data: {
          token: token,
        },
      });
      return;
    }
    await embassyDB.tokens.create({
      data: {
        token: token,
        userId: userId,
        createdAt: String(new Date()),
      } as TokenInterface,
    });
  };

  generateTokens = async (user: {
    email: string;
    id: number;
    name: string;
    surname: string;
  }) => {
    const payload = {
      email: user.email,
      id: user.id,
      name: user.name,
      surname: user.surname,
    };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: process.env.ACCESS_TOKEN_LIFE,
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: process.env.REFRESH_TOKEN_LIFE,
    });
    return { accessToken, refreshToken };
  };

  deleteToken = async (token: string) => {
    await embassyDB.tokens.delete({
      where: {
        token: token,
      },
    });
  };

  refreshToken = async (token: string) => {
    if (!token) {
      throw ApiError.unauthorized();
    }
    const userData = (await this.validateRefreshToken(
      token
    )) as UserDTOInterface;

    if (!userData) {
      throw ApiError.unauthorized();
    }
    const user = await embassyDB.users.findUnique({
      where: {
        id: userData.id,
      },
      select: {
        email: true,
        id: true,
        name: true,
        surname: true,
      },
    });
    if (!user) {
      throw ApiError.badRequest("User not found");
    }
    const tokens = await this.generateTokens(user as UserDTOInterface);
    await this.saveToken(user.id, tokens.refreshToken);
    return tokens;
  };

  validateAccessToken = (token: string) => {
    try {
      const userData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
      return userData;
    } catch (err: any) {
      return null;
    }
  };

  validateRefreshToken = (token: string) => {
    try {
      const userData = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!);
      return userData;
    } catch (err: any) {
      return null;
    }
  };

  findToken = async (token: string) => {
    const tokenData = await embassyDB.tokens.findUnique({
      where: {
        token: token,
      },
      select: {
        token: true,
      },
    });
    return tokenData;
  };
}

export default new tokenService();
