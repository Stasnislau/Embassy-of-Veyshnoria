import * as dotenv from "dotenv";

import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorMiddleware from "../src/middleWares/error-middleware";
import express from "express";
import residencePermitApplicationRouter from "../src/Routers/residencePermitApplication.router";
import userRouter from "../src/Routers/user.router";
import visaApplicationRouter from "../src/Routers/visaApplication.router";
import visitRouter from "../src/Routers/visit.router";

dotenv.config();
if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
}));

const prisma = new PrismaClient();
app.use("/users", userRouter);
app.use("/visits", visitRouter);
app.use("/visas", visaApplicationRouter);
app.use("/permits", residencePermitApplicationRouter);

app.use(errorMiddleware);

// serve frontend from Client/build
app.use(express.static("Client/build"));

app.listen(PORT, () => {
  console.log("Server is running on port 3001");
});
