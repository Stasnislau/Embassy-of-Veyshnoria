import { embassyDB } from "../src/utils/db.server";
import express from "express";

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
export const authenticationRouter = express.Router();

authenticationRouter.post("/", async (req, res) => {
  const { email, password } = req.body;
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
    res.status(404).send("User not found");
    return;
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
    res.status(404).send("User not found");
    return;
  }
  try {
    const isPasswordCorrect = await bcrypt.compare(
      password,
      credentials.password
    );
    if (!isPasswordCorrect) {
      res.status(401).send("Incorrect email or password");
      return;
    }
  } catch (error) {
    res.status(500).send();
  }

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken });
});
