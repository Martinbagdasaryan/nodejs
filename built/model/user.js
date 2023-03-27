"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userLogin_1 = __importDefault(require("./userLogin"));
const User = new mongoose_1.default.Schema({
    name: { type: String, required: true, unique: true },
    surname: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true },
    roles: [{ type: String, ref: userLogin_1.default }],
});
exports.default = mongoose_1.default.model("User", User);
