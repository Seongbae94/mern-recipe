import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { userRouter } from "./routes/users.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);

mongoose.connect(process.env.MONGODB_URL);

app.listen(3001, () => console.log("SERVER STARTED!"));
