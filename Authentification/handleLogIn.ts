import { CredentialsInterface } from "../src/Interfaces";
import { Express } from "express";
import { embassyDB } from "../src/utils/db.server";

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

export const handleLogIn = async (app: Express) => {
  app.post("/login", async (req, res) => {
    const { email, password } = req.body;
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
    const isPasswordCorrect = await bcrypt.compare(
      password,
      credentials.password
    );
    if (!isPasswordCorrect) {
      res.status(401).send("Incorrect email or password");
      return;
    }
    const userId = await embassyDB.users.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
      },
    });

    jwt.sign(
      { userId: userId.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
          return;
        }
        res.json({ token });
      }
    );
  });
};
