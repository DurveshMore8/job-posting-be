"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobRoutes = void 0;
const express_1 = require("express");
const job_controller_1 = __importDefault(require("./job_controller"));
const user_middleware_1 = __importDefault(require("../../middlewares/user_middleware"));
exports.jobRoutes = (0, express_1.Router)();
exports.jobRoutes.post("/job/add-category", user_middleware_1.default, job_controller_1.default.addCategory);
exports.jobRoutes.get("/job/get-category-list", user_middleware_1.default, job_controller_1.default.getCategoryList);
exports.jobRoutes.post("/job/create-job", user_middleware_1.default, job_controller_1.default.createJob);
exports.jobRoutes.get("/job/fetch-jobs", user_middleware_1.default, job_controller_1.default.fetchJobs);
exports.jobRoutes.post("/job/fetch-job-by-id", user_middleware_1.default, job_controller_1.default.fetchJobById);
exports.jobRoutes.post("/job/apply-job", user_middleware_1.default, job_controller_1.default.applyJob);
exports.jobRoutes.post("/job/fetch-applied", user_middleware_1.default, job_controller_1.default.fetchJobApplied);
exports.jobRoutes.post("/job/fetch-applied-by-id", user_middleware_1.default, job_controller_1.default.fetchJobAppliedId);
exports.jobRoutes.post("/job/accept-job", user_middleware_1.default, job_controller_1.default.acceptJob);
