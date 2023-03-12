import * as dotenv from "dotenv";

import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express from "express";

const errorMiddleware = require("../src/middleWares/error-middleware.ts");

const userRouter = require("../src/Routers/user.router.ts");

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
app.use("/users", userRouter);
app.use(errorMiddleware);


app.listen(PORT, () => {
  console.log("Server is running on port 3001");
});
