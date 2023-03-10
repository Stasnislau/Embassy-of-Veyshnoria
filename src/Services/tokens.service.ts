import { TokenInterface, UserInterface } from "../Interfaces";

import ApiError from "../exceptions/api-error";
import { embassyDB } from "../utils/db.server";
import jwt from "jsonwebtoken";

class tokenService {
  saveToken = async (userId: number, token: string) => {
    const tokenData = await embassyDB.token.findUnique({
      where: {
        userId: userId,
      },
    });
    if (tokenData) {
      await embassyDB.token.update({
        where: {
          userId: userId,
        },
        data: {
          token: token,
        },
      });
      return;
    }
    await embassyDB.token.create({
      data: {
        token: token,
        userId: userId,
        createdAt: String(new Date()),
      } as TokenInterface,
    });
  };

  generateTokens = async (user: { email: string; id: number }) => {
    const payload = {
      email: user.email,
      id: user.id,
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
    await embassyDB.token.delete({
      where: {
        token: token,
      },
    });
  };

  refreshToken = async (token: string) => {
    if (!token) {
      throw ApiError.unauthorized();
    }
    const userData = (await this.validateRefreshToken(token)) as {
      email: string;
      id: number;
    };
    if (!userData) {
      throw ApiError.unauthorized();
    }
    const tokens = await this.generateTokens(userData);
    await this.saveToken(userData.id, tokens.refreshToken);
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
    const tokenData = await embassyDB.token.findUnique({
      where: {
        token: token,
      },
    });
    return tokenData;
  };
}

export default new tokenService();
