"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// app.use(passport.initialize());
// app.use(passport.session());
// Routers
app.get("/", (req, res) => {
    res.send("Hello From Health Buddy API");
});
//creating universal route for routes not defined on the server
app.use("*", (req, res) => {
    res.status(201).json({
        statusCode: 201,
        message: `path not found on the server ${req.params}`,
    });
});
exports.default = app;
