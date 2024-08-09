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
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongo = exports.client = void 0;
const mongodb_1 = require("mongodb");
let client;
const connectMongo = () => __awaiter(void 0, void 0, void 0, function* () {
    const uri = process.env.MONGO_URI ||
        "mongodb+srv://job_posting:job_posting@cluster0.npsky.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    exports.client = client = new mongodb_1.MongoClient(uri, {
        serverApi: {
            version: mongodb_1.ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });
    try {
        yield client.connect();
        console.log("Connected to MongoDB");
    }
    catch (e) {
        console.log(e);
    }
});
exports.connectMongo = connectMongo;
