import * as dotenv from "dotenv";

import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorMiddleware from "./MiddleWares/error-middleware";
import express from "express";
import path from "path";
import residencePermitApplicationRouter from "../src/Routers/residencePermitApplication.router";
import userRouter from "../src/Routers/user.router";
import visaApplicationRouter from "../src/Routers/visaApplication.router";
import visitRouter from "../src/Routers/visit.router";

dotenv.config();
if (!process.env.PORT) {
  process.exit(1);
}

export const CLIENT_URL = "http://localhost:3000";

const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: CLIENT_URL,
  })
);

const prisma = new PrismaClient();
app.use("/api/users", userRouter);
app.use("/api/visits", visitRouter);
app.use("/api/visas", visaApplicationRouter);
app.use("/api/permits", residencePermitApplicationRouter);
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "../Client/build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client/build", "index.html"));
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
