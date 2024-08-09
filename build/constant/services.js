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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandling = void 0;
exports.sendEmail = sendEmail;
const message_1 = __importDefault(require("../config/message"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const errorHandling = (e, res) => {
    if (e instanceof message_1.default) {
        res.status(e.statusCode).json(e);
    }
    else if (e instanceof Error) {
        return res.status(500).json({ statusCode: 500, message: e.message });
    }
    else {
        return res
            .status(500)
            .json({ statusCode: 500, message: "Internal Server Error." });
    }
};
exports.errorHandling = errorHandling;
function sendEmail(fromName, fromPhone, from, toName, to, title, designation, sendTo) {
    return __awaiter(this, void 0, void 0, function* () {
        let transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD,
            },
        });
        yield transporter.sendMail({
            from: `${fromName} <${from}>`,
            to: to,
            subject: sendTo == "admin"
                ? `Job Applicatiom from ${fromName}`
                : `Application received at ${fromName}`,
            html: sendTo == "admin"
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
    });
}
