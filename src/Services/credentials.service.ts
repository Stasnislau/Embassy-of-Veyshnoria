import ApiError from "../exceptions/api-error";
import { CredentialsInterface } from "../Interfaces";
import bcrypt from "bcryptjs";
import { embassyDB } from "../../src//utils/db.server";

export const createCredentials = async (credentials: CredentialsInterface) => {
  const { email, password } = credentials;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newCredentials = await embassyDB.credentials.create({
    data: {
      password: hashedPassword,
      user: {
        connect: {
          email: email,
        },
      },
    },
  });
  if (!newCredentials) {
    throw ApiError.badRequest("Credentials not created");
  }
  return newCredentials;
};


