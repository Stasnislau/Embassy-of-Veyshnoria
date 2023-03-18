import { UserDTOInterface, UserInterface } from "../Interfaces";

import ApiError from "../exceptions/api-error";
import bcrypt from "bcryptjs";
import { embassyDB } from "../utils/db.server";
import tokensService from "../Services/tokens.service";

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
    const userDTO = {
      email: user.email,
      id: user.id,
    };
    const tokens = await tokensService.generateTokens(userDTO);
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
        name: true,
        surname: true,
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
    const isPasswordCorrect = await bcrypt.compare(
      password,
      credentials.password
    );
    if (!isPasswordCorrect) {
      throw ApiError.badRequest("Incorrect email or password");
    }
    const tokens = await tokensService.generateTokens(user);
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
    const userData = tokensService.validateRefreshToken(refreshToken) as {
      id: number;
      email: string;
    };
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
    const tokens = await tokensService.generateTokens(user);
    await tokensService.saveToken(user.id, tokens.refreshToken);
    return { ...tokens, user };
  }

  async getUser(id: string) {
    const user = await embassyDB.users.findUnique({
      where: {
        id: Number(id),
      },
    });
    return user;
  }

  async updateUser(
    id: string,
    data: {
      name: string;
      surname: string;
      email: string;
      dateOfBirth: string;
      birthPlace: string;
      phoneNumber: string;
      address: string;
      city: string;
      country: string;
      zip: string;
      passportNumber: string;
      passportExpirationDate: string;
      passportIssuingDate: string;
      passportIssuingCountry: string;
    }
  ) {
    console.log("ZASHLO");
    const candidate = await embassyDB.users.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        email: true,
      },
    });
    if (!candidate) {
      throw ApiError.badRequest(`User with does not exist`);
    }
    console.log("ZASHLO1");
    if (candidate.email !== data.email) {
      const credentials = await embassyDB.credentials.findUnique({
        where: {
          email: candidate.email,
        },
        select: {
          id: true,
        },
      });
      console.log("credentials" + credentials);
      if (!credentials) {
        throw ApiError.badRequest(`User with does not exist`);
      }
      await embassyDB.credentials.update({
        where: {
          id: credentials.id,
        },
        data: {
          email: data.email,
        },
      });
    }
    console.log("data", data);
    const user = await embassyDB.users.update({
      where: {
        id: Number(id),
      },
      data: data as UserInterface,
    });
    console.log(user, "user");
    return user;
  }

  async updatePassword(email: string, password: string) {
    const candidate = await embassyDB.credentials.findUnique({
      where: {
        email: email,
      },
      select: {
        password: true,
        id: true,
      },
    });
    if (!candidate) {
      throw ApiError.badRequest(`User with does not exist`);
    }
    if (await bcrypt.compare(password, candidate.password)) {
      throw ApiError.badRequest(`Password is the same`);
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const updatedCredentials = await embassyDB.credentials.update({
      where: {
        id: candidate.id,
      },
      data: {
        password: hashPassword,
      },
    });
    return updatedCredentials;
  }

  async getShortUserByEmail(email: string) {
    const user = await embassyDB.users.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        surname: true,
      },
    });
    return user;
  }
}

export default new UserService();
