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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../../constant/services");
const mongo_1 = require("../../config/mongo");
const message_1 = __importDefault(require("../../config/message"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
}
_a = UserController;
// registration of a company
UserController.registerCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, type, locations, companyLogo, phone, password } = req.body;
        const isAdmin = yield mongo_1.client
            .db("main")
            .collection("credential")
            .findOne({ $or: [{ email }, { phone }] });
        if (isAdmin) {
            if (email === isAdmin.email) {
                throw new message_1.default(409, "User with this email already exist.");
            }
            else if (phone === isAdmin.phone) {
                throw new message_1.default(409, "User with this phone number already exist.");
            }
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 8);
        const locationsList = locations.split(", ");
        yield mongo_1.client.db("main").collection("admin").insertOne({
            name,
            email,
            type,
            locations,
            phone,
            companyLogo,
        });
        yield mongo_1.client.db("main").collection("credential").insertOne({
            email,
            phone,
            password: hashedPassword,
            type: "admin",
        });
        const message = {
            statusCode: 200,
            message: "Company creation successful.",
        };
        res.json(message);
    }
    catch (e) {
        (0, services_1.errorHandling)(e, res);
    }
});
// registration of a candidate
UserController.registerCandidate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, locations, designation, skillSet, profileImage, password, } = req.body;
        const isCandidate = yield mongo_1.client
            .db("main")
            .collection("credential")
            .findOne({ $or: [{ email }, { phone }] });
        if (isCandidate) {
            if (email === isCandidate.email) {
                throw new message_1.default(409, "User with this email already exist.");
            }
            else if (phone === isCandidate.phone) {
                throw new message_1.default(409, "User with this phone number already exist.");
            }
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 8);
        const skillSetList = skillSet.split(", ");
        const locationsList = locations.split(", ");
        yield mongo_1.client.db("main").collection("candidate").insertOne({
            name,
            email,
            phone,
            locations: locationsList,
            designation,
            skillSet: skillSetList,
            profileImage,
        });
        yield mongo_1.client.db("main").collection("credential").insertOne({
            email,
            phone,
            password: hashedPassword,
            type: "candidate",
        });
        const message = {
            statusCode: 200,
            message: "Candidate creation successful.",
        };
        res.json(message);
    }
    catch (e) {
        (0, services_1.errorHandling)(e, res);
    }
});
// login both candidate and company
UserController.loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield mongo_1.client
            .db("main")
            .collection("credential")
            .findOne({ $or: [{ email: username }, { phone: username }] });
        if (!user) {
            throw new message_1.default(404, "User with this credentials not found.");
        }
        const isPasswordCorrect = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordCorrect) {
            throw new message_1.default(401, "Incorrect password.");
        }
        const jwtAuthKey = process.env.JWT_AUTH_KEY || "passwordkey";
        const authToken = jsonwebtoken_1.default.sign({
            email: user.email,
            phone: user.phone,
            type: user.type,
        }, jwtAuthKey);
        res.json({ authToken, type: user.type });
    }
    catch (e) {
        (0, services_1.errorHandling)(e, res);
    }
});
// forgot password for both user
UserController.forgotPassword = (req, res) => {
    try {
        const { email } = req.body;
    }
    catch (e) {
        (0, services_1.errorHandling)(e, res);
    }
};
UserController.getUserByToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const authToken = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
        const decodedToken = jsonwebtoken_1.default.decode(authToken);
        const user = yield mongo_1.client
            .db("main")
            .collection(decodedToken.type)
            .findOne({
            $and: [
                { email: decodedToken.email },
                { phone: decodedToken.phone },
            ],
        }, { projection: { _id: 0 } });
        res.json(user);
    }
    catch (e) {
        (0, services_1.errorHandling)(e, res);
    }
});
exports.default = UserController;
