import * as dotenv from "dotenv";

import { PrismaClient } from "@prisma/client";
import { authenticateToken } from "../src/Authentication/authentication.middleware";
import { authenticationRouter } from "../src/Authentication/authentication.router";
import cors from "cors";
import express from "express";
import { residencePermitApplicationRouter } from "./ResidencePermitApplication/residencePermitApplication.router";
import { userRouter } from "./User/user.router";
import { visaApplicationRouter } from "./VisaApplication/visaApplication.router";
import { visitRouter } from "./Visit/visit.router";

const cookieParser = require("cookie-parser");

dotenv.config();
if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
const prisma = new PrismaClient();

app.listen(PORT, () => {
  console.log("Server is running on port 3001");
});

app.use("/login", authenticationRouter);
app.use(authenticateToken);
app.use("/users", userRouter);
app.use("/visits", visitRouter);
app.use("/visa-applications", visaApplicationRouter);
app.use("/residence-applications", residencePermitApplicationRouter);

