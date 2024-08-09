import { Request, Response } from "express";
import { errorHandling, sendEmail } from "../../constant/services";
import { client } from "../../config/mongo";
import Message from "../../config/message";
import { ObjectId } from "mongodb";

class JobController {
  static addCategory = async (req: Request, res: Response) => {
    try {
      const { categoryName, email } = req.body;

      await client
        .db("main")
        .collection("category")
        .insertOne({ categoryName, email, updatedAt: new Date() });

      const message: Message = {
        statusCode: 200,
        message: "Category creation successful.",
      };

      res.json(message);
    } catch (e) {
      errorHandling(e, res);
    }
  };

  static getCategoryList = async (req: Request, res: Response) => {
    try {
      const categories = await client
        .db("main")
        .collection("category")
        .find({})
        .toArray();

      res.json({ categories });
    } catch (e) {
      errorHandling(e, res);
    }
  };

  static createJob = async (req: Request, res: Response) => {
    try {
      const {
        title,
        companyName,
        category,
        email,
        tags,
        skills,
        experienceReq,
        description,
        salary,
      } = req.body;

      const skillList = skills.split(",");
      const tagList = tags.split(",");

      const user = await client
        .db("main")
        .collection("admin")
        .findOne({ email });

      await client.db("main").collection("job").insertOne({
        title,
        companyName,
        category,
        email,
        tags: tagList,
        skills: skillList,
        experienceReq,
        description,
        salary,
        companyLogo: user!.companyLogo,
      });

      const message: Message = {
        statusCode: 200,
        message: "Job creation successful.",
      };

      res.json(message);
    } catch (e) {
      errorHandling(e, res);
    }
  };

  static fetchJobs = async (req: Request, res: Response) => {
    try {
      const jobs = await client.db("main").collection("job").find().toArray();

      res.json({ jobs });
    } catch (e) {
      errorHandling(e, res);
    }
  };

  static fetchJobById = async (req: Request, res: Response) => {
    try {
      const { id } = req.body;

      const job = await client
        .db("main")
        .collection("job")
        .findOne({ _id: new ObjectId(id) });

      res.json({ job });
    } catch (e) {
      errorHandling(e, res);
    }
  };

  static applyJob = async (req: Request, res: Response) => {
    try {
      const {
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
      } = req.body;

      await client.db("main").collection("applied-job").insertOne({
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

      await sendEmail(
        caName,
        caPhone,
        caEmail,
        coName,
        coEmail,
        coTitle,
        caDesignation,
        "admin"
      );

      await sendEmail(
        coName,
        coEmail,
        coEmail,
        caName,
        caEmail,
        coTitle,
        caDesignation,
        "candidate"
      );

      const message: Message = {
        statusCode: 200,
        message: "Job application successful.",
      };

      res.json(message);
    } catch (e) {
      errorHandling(e, res);
    }
  };

  static fetchJobApplied = async (req: Request, res: Response) => {
    try {
      const { type, email } = req.body;

      if (type === "admin") {
        const jobApplied = await client
          .db("main")
          .collection("applied-job")
          .find({ coEmail: email })
          .toArray();

        console.log(jobApplied);

        return res.json({ jobApplied });
      } else {
        const jobApplied = await client
          .db("main")
          .collection("applied-job")
          .find({ caEmail: email })
          .toArray();

        return res.json({ jobApplied });
      }
    } catch (e) {
      errorHandling(e, res);
    }
  };

  static fetchJobAppliedId = async (req: Request, res: Response) => {
    try {
      const { id } = req.body;

      const applied = await client
        .db("main")
        .collection("applied-job")
        .findOne({ _id: new ObjectId(id) });

      res.json({ applied });
    } catch (e) {
      errorHandling(e, res);
    }
  };

  static acceptJob = async (req: Request, res: Response) => {
    try {
      const { id, reason, status } = req.body;

      await client
        .db("main")
        .collection("applied-job")
        .updateOne(
          { _id: new ObjectId(id) },
          { $set: { status: status, reason: reason } }
        );

      const message: Message = {
        statusCode: 200,
        message: "Status Updated.",
      };

      res.json(message);
    } catch (e) {
      errorHandling(e, res);
    }
  };
}

export default JobController;
