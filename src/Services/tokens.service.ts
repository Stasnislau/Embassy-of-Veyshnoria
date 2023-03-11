import { TokenInterface, UserInterface } from "../Interfaces";

import { embassyDB } from "../utils/db.server";

const jwt = require("jsonwebtoken");

export const saveToken = async (userId: number, token: string) => {
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

export const generateTokens = async (
  user: {
    email: string;
    id: number;
  },
  userId: number
) => {
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "15d",
  });
  return { accessToken, refreshToken };
};
