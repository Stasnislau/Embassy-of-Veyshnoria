import * as dotenv from "dotenv";

import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express from "express";

const errorMiddleware = require("../src/middleWares/error-middleware.ts");

const userRouter = require("../src/Routers/user.router.ts");
const visitRouter = require("../src/Routers/visit.router.ts");
const visaApplicationRouter = require("../src/Routers/visaApplication.router.ts");
const residencePermitApplicationRouter = require("../src/Routers/residencePermitApplication.router.ts");

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
app.use("/visits", visitRouter);
app.use("/visas", visaApplicationRouter);
app.use("/permits", residencePermitApplicationRouter);

app.use(errorMiddleware);


app.listen(PORT, () => {
  console.log("Server is running on port 3001");
});
