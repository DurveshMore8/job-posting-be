"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../../constant/services");
const mongo_1 = require("../../config/mongo");
const mongodb_1 = require("mongodb");
class JobController {
}
_a = JobController;
JobController.addCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryName, email } = req.body;
        yield mongo_1.client
            .db("main")
            .collection("category")
            .insertOne({ categoryName, email, updatedAt: new Date() });
        const message = {
            statusCode: 200,
            message: "Category creation successful.",
        };
        res.json(message);
    }
    catch (e) {
        (0, services_1.errorHandling)(e, res);
    }
});
JobController.getCategoryList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield mongo_1.client
            .db("main")
            .collection("category")
            .find({})
            .toArray();
        res.json({ categories });
    }
    catch (e) {
        (0, services_1.errorHandling)(e, res);
    }
});
JobController.createJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, companyName, category, email, tags, skills, experienceReq, description, salary, } = req.body;
        const skillList = skills.split(",");
        const tagList = tags.split(",");
        const user = yield mongo_1.client
            .db("main")
            .collection("admin")
            .findOne({ email });
        yield mongo_1.client.db("main").collection("job").insertOne({
            title,
            companyName,
            category,
            email,
            tags: tagList,
            skills: skillList,
            experienceReq,
            description,
            salary,
            companyLogo: user.companyLogo,
        });
        const message = {
            statusCode: 200,
            message: "Job creation successful.",
        };
        res.json(message);
    }
    catch (e) {
        (0, services_1.errorHandling)(e, res);
    }
});
JobController.fetchJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobs = yield mongo_1.client.db("main").collection("job").find().toArray();
        res.json({ jobs });
    }
    catch (e) {
        (0, services_1.errorHandling)(e, res);
    }
});
JobController.fetchJobById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const job = yield mongo_1.client
            .db("main")
            .collection("job")
            .findOne({ _id: new mongodb_1.ObjectId(id) });
        res.json({ job });
    }
    catch (e) {
        (0, services_1.errorHandling)(e, res);
    }
});
JobController.applyJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { jobId, coName, coEmail, coCategory, coDescription, coImage, coTitle, caName, caEmail, caPhone, caLocations, caDesignation, caSkillSets, } = req.body;
        yield mongo_1.client.db("main").collection("applied-job").insertOne({
            jobId,
            coName,
            coEmail,
            coCategory,
            coDescription,
            coImage,
            coTitle,
            caName,
            caEmail,
            caPhone,
            caLocations,
            caDesignation,
            caSkillSets,
            appliedAt: new Date(),
        });
        console.log(coTitle);
        yield (0, services_1.sendEmail)(caName, caPhone, caEmail, coName, coEmail, coTitle, caDesignation, "admin");
        yield (0, services_1.sendEmail)(coName, coEmail, coEmail, caName, caEmail, coTitle, caDesignation, "candidate");
        const message = {
            statusCode: 200,
            message: "Job application successful.",
        };
        res.json(message);
    }
    catch (e) {
        (0, services_1.errorHandling)(e, res);
    }
});
JobController.fetchJobApplied = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type, email } = req.body;
        if (type === "admin") {
            const jobApplied = yield mongo_1.client
                .db("main")
                .collection("applied-job")
                .find({ coEmail: email })
                .toArray();
            console.log(jobApplied);
            return res.json({ jobApplied });
        }
        else {
            const jobApplied = yield mongo_1.client
                .db("main")
                .collection("applied-job")
                .find({ caEmail: email })
                .toArray();
            return res.json({ jobApplied });
        }
    }
    catch (e) {
        (0, services_1.errorHandling)(e, res);
    }
});
JobController.fetchJobAppliedId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const applied = yield mongo_1.client
            .db("main")
            .collection("applied-job")
            .findOne({ _id: new mongodb_1.ObjectId(id) });
        res.json({ applied });
    }
    catch (e) {
        (0, services_1.errorHandling)(e, res);
    }
});
JobController.acceptJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, reason, status } = req.body;
        yield mongo_1.client
            .db("main")
            .collection("applied-job")
            .updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { status: status, reason: reason } });
        const message = {
            statusCode: 200,
            message: "Status Updated.",
        };
        res.json(message);
    }
    catch (e) {
        (0, services_1.errorHandling)(e, res);
    }
});
exports.default = JobController;
