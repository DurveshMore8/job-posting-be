import { Router } from "express";
import UserController from "./user_controller";
import userMiddleware from "../../middlewares/user_middleware";

export const userRoutes = Router();

userRoutes.post("/admin/register", UserController.registerCompany);

userRoutes.post("/candidate/register", UserController.registerCandidate);

userRoutes.post("/user/login", UserController.loginUser);

userRoutes.post("/user/forgot-password", UserController.forgotPassword);

userRoutes.get(
  "/user/user-by-token",
  userMiddleware,
  UserController.getUserByToken
);
