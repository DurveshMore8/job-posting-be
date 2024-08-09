"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = __importDefault(require("./user_controller"));
const user_middleware_1 = __importDefault(require("../../middlewares/user_middleware"));
exports.userRoutes = (0, express_1.Router)();
exports.userRoutes.post("/admin/register", user_controller_1.default.registerCompany);
exports.userRoutes.post("/candidate/register", user_controller_1.default.registerCandidate);
exports.userRoutes.post("/user/login", user_controller_1.default.loginUser);
exports.userRoutes.post("/user/forgot-password", user_controller_1.default.forgotPassword);
exports.userRoutes.get("/user/user-by-token", user_middleware_1.default, user_controller_1.default.getUserByToken);
