import express from "express";
import cors from "cors";
import http from "http";
import { constRoutes } from "./constant/routes";
import { connectMongo } from "./config/mongo";
import { userRoutes } from "./modules/user/user_routes";
import { jobRoutes } from "./modules/job/job_routes";
import { configDotenv } from "dotenv";

configDotenv();

const port = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

connectMongo();

app.use(constRoutes);
app.use(userRoutes);
app.use(jobRoutes);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
