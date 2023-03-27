"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const validator = (schema) => (payload) => schema.validate(payload, { abortEarly: false });
const schema = joi_1.default.object().keys({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().regex(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? ]).*$/),
});
const validateUser = validator(schema);
exports.default = validateUser;
