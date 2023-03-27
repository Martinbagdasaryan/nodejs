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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const router_1 = __importDefault(require("./router/router"));
const app = (0, express_1.default)();
const port = 5001;
const url = `mongodb://localhost:27017/local`;
app.use(express_1.default.json());
app.use("/api", router_1.default);
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(err.status).send({ message: err.message });
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(url);
        app.listen(port, () => {
            console.log(`server is runing on port ${port}`);
        });
    }
    catch (e) {
        console.log(e);
    }
}))();
