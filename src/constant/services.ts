import { Response } from "express";
import Message from "../config/message";
import nodemailer from "nodemailer";

const errorHandling = (e: any, res: Response) => {
  if (e instanceof Message) {
    res.status(e.statusCode).json(e);
  } else if (e instanceof Error) {
    return res.status(500).json({ statusCode: 500, message: e.message });
  } else {
    return res
      .status(500)
      .json({ statusCode: 500, message: "Internal Server Error." });
  }
};

async function sendEmail(
  fromName: string,
  fromPhone: string,
  from: string,
  toName: string,
  to: string,
  title: string,
  designation: string,
  sendTo: "admin" | "candidate"
) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `${fromName} <${from}>`,
    to: to,
    subject:
      sendTo == "admin"
        ? `Job Applicatiom from ${fromName}`
        : `Application received at ${fromName}`,
    html:
      sendTo == "admin"
        ? `
        <p>New Application Details</p>
        <p>For title: ${title}</p>
        <p>Name: ${fromName}</p>
        <p>Email: ${from}</p>
        <p>Phone: ${fromPhone}</p>
        <p>Current Designation: ${designation}</p>
    `
        : `
        <p>Hello ${toName}</p>
        <p>We received your job application for ${title}. We will get back to once we verify your application.</p>
        <p>For any queries contact us on ${fromPhone}</p>
        `,
  });
}

export { errorHandling, sendEmail };
