import { embassyDB } from "../utils/db.server";

const ApiError = require("../Exceptions/api-error");
const userDTO = require("../dtos/user-dto");

const tokensService = require("../Services/tokens.service");

const bcrypt = require("bcryptjs");

const router = require("../Routers/user.router");

class UserService {
  async registration(
    name: string,
    surname: string,
    email: string,
    password: string
  ) {
    const candidate = await embassyDB.users.findUnique({
      where: {
        email: email,
      },
    });
    if (candidate) {
      throw ApiError.badRequest(`User with email ${email} already exists`);
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await embassyDB.users.create({
      data: {
        name: name,
        surname: surname,
        email: email,
        dateOfBirth: "",
        birthPlace: "",
        phoneNumber: "",
        address: "",
        city: "",
        country: "",
        zip: "",
        passportNumber: "",
        passportExpirationDate: "",
        passportIssuingDate: "",
        passportIssuingCountry: "",
      },
    });
    await embassyDB.credentials.create({
      data: {
        password: hashPassword,
        user: {
          connect: {
            email: email,
          },
        },
      },
    });
    const userDTO = embassyDB.users.findUnique({
      where: {
        email: email,
      },
      select: {
        email: true,
        id: true,
      },
    });

    const tokens = await tokensService.generateTokens(userDTO, user.id);
    await tokensService.saveToken(user.id, tokens.refreshToken);
    return { ...tokens, userDTO };
  }

  async login(email: string, password: string) {
    const user = await embassyDB.users.findUnique({
      where: {
        email: email,
      },
      select: {
        email: true,
        id: true,
      },
    });
    if (!user) {
      throw ApiError.badRequest("User not found");
    }
    const credentials = await embassyDB.credentials.findUnique({
      where: {
        email: email,
      },
      select: {
        email: true,
        password: true,
      },
    });
    if (!credentials) {
      throw ApiError.badRequest("User not found");
    }
    try {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        credentials.password
      );
      if (!isPasswordCorrect) {
        throw ApiError.badRequest("Incorrect email or password");
      }
    } catch (error: unknown) {
      throw ApiError.internal("Internal server error");
    }
    const tokens = await tokensService.generateTokens(user, user.id);
    await tokensService.saveToken(user.id, tokens.refreshToken);
    return { ...tokens, user };
  }

  async logout(refreshToken: string) {
    const token = await tokensService.deleteToken(refreshToken);
    return token;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.unauthorized();
    }
    const userData = tokensService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokensService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.unauthorized();
    }
    const user = await embassyDB.users.findUnique({
      where: {
        id: userData.id,
      },
      select: {
        email: true,
        id: true,
      },
    });
    if (!user) {
      throw ApiError.badRequest("User not found");
    }
    const tokens = await tokensService.generateTokens(user, user.id);
    await tokensService.saveToken(user.id, tokens.refreshToken);
    return { ...tokens, user };
  }
}

module.exports = new UserService();
