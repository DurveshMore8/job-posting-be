"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constRoutes = void 0;
const express_1 = require("express");
exports.constRoutes = (0, express_1.Router)();
exports.constRoutes.get("/", (req, res) => {
    res.json({ version: 1.0, message: "Server is up and running." });
});
exports.constRoutes.get("/health", (req, res) => {
    res.json({ version: 1.0, message: "Server is healthy, up and running." });
});
