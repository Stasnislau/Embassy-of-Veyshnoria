import { CredentialsInterface } from "../Interfaces";
import { embassyDB } from "../../src//utils/db.server";

const bcrypt = require("bcryptjs");


export const createCredentials = async (credentials: CredentialsInterface) => {
  const { email, password } = credentials;
  const hashedPassword = await bcrypt.hash(password, 10);
  return embassyDB.credentials.create({
    data: {
      password: hashedPassword,
      user: {
        connect: {
          email: email,
        },
      },
    },
  });
};
