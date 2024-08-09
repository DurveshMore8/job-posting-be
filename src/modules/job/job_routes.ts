import { Router } from "express";
import JobController from "./job_controller";
import userMiddleware from "../../middlewares/user_middleware";
import UserController from "../user/user_controller";

export const jobRoutes = Router();

jobRoutes.post("/job/add-category", userMiddleware, JobController.addCategory);

jobRoutes.get(
  "/job/get-category-list",
  userMiddleware,
  JobController.getCategoryList
);

jobRoutes.post("/job/create-job", userMiddleware, JobController.createJob);

jobRoutes.get("/job/fetch-jobs", userMiddleware, JobController.fetchJobs);

jobRoutes.post(
  "/job/fetch-job-by-id",
  userMiddleware,
  JobController.fetchJobById
);

jobRoutes.post("/job/apply-job", userMiddleware, JobController.applyJob);

jobRoutes.post(
  "/job/fetch-applied",
  userMiddleware,
  JobController.fetchJobApplied
);

jobRoutes.post(
  "/job/fetch-applied-by-id",
  userMiddleware,
  JobController.fetchJobAppliedId
);

jobRoutes.post("/job/accept-job", userMiddleware, JobController.acceptJob);
