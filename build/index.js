"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const routes_1 = require("./constant/routes");
const mongo_1 = require("./config/mongo");
const user_routes_1 = require("./modules/user/user_routes");
const job_routes_1 = require("./modules/job/job_routes");
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
const port = process.env.PORT || 8000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "50mb" }));
(0, mongo_1.connectMongo)();
app.use(routes_1.constRoutes);
app.use(user_routes_1.userRoutes);
app.use(job_routes_1.jobRoutes);
const server = http_1.default.createServer(app);
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
