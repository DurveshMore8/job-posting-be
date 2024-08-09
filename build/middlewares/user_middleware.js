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
const message_1 = __importDefault(require("../config/message"));
const services_1 = require("../constant/services");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const authToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (authToken === null ||
            authToken === undefined ||
            authToken === "" ||
            Array.isArray(authToken)) {
            throw new message_1.default(400, "No token specified, access denied. Specify token in headers");
        }
        const jwtAuthKey = process.env.JWT_AUTH_KEY || "passwordkey";
        const verifyToken = jsonwebtoken_1.default.verify(authToken, jwtAuthKey);
        if (!verifyToken) {
            throw new message_1.default(401, "Invalid token, access denied.");
        }
        next();
    }
    catch (e) {
        if (e.message == "jwt malformed") {
            return res
                .status(401)
                .json({ statusCode: 401, message: "Unauthorized user." });
        }
        (0, services_1.errorHandling)(e, res);
    }
});
exports.default = userMiddleware;
