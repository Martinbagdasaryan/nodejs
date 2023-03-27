"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../service/config");
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!(token === null || token === void 0 ? void 0 : token.split(" ")[1])) {
            return res.status(403).json({ message: "polzvtel chgtnvav" });
        }
        const decodedData = jsonwebtoken_1.default.verify(token, config_1.secret);
        req.user = decodedData;
        next();
    }
    catch (e) {
        console.log(e);
        return res.status(403).json({ message: "polzvtel chgtam" });
    }
};
