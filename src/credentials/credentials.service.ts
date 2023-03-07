import { CredentialsInterface } from "../Interfaces";
import { embassyDB } from "../utils/db.server";

const bcrypt = require("bcrypt");

export const getCredentialsById = async (
  id: number
): Promise<CredentialsInterface> => {
  const credentials = await embassyDB.credentials.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
      email: true,
      password: true,
      user: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!credentials) {
    throw new Error("Credentials not found");
  }
  return credentials;
};

export const getCredentialsByEmail = async (
  email: string
): Promise<CredentialsInterface> => {
  const user = await embassyDB.users.findUnique({
    where: {
      email: email,
    },
    select: {
      credentials: {
        select: {
          email: true,
          password: true,
        },
      },
    },
  });
  if (!user || !user.credentials) {
    throw new Error(`No such user`);
  }
  const credentials = {
    email: user.credentials.email,
    password: user.credentials.password,
  } as CredentialsInterface;
  return credentials;
};

export const createCredentials = async (
  credentials: CredentialsInterface
): Promise<CredentialsInterface> => {
  const { email, password } = credentials;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newCredentials = await embassyDB.credentials.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    return newCredentials;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const updateCredentials = async (
  id: number,
  credentials: CredentialsInterface
): Promise<CredentialsInterface> => {
  const { email, password } = credentials;
  const oldCredentials = await getCredentialsById(id);
  try {
    if (bcrypt.compare(password, oldCredentials.password)) {
      throw new Error("Password is the same as the old one");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedCredentials = await embassyDB.credentials.update({
      where: {
        id: Number(id),
      },
      data: {
        email,
        password: hashedPassword,
      },
    });
    return updatedCredentials;
  } catch (err: any) {
    throw new Error(err);
  }
};
