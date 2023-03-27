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
const userService_1 = __importDefault(require("../service/userService"));
class UserController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userService_1.default.create(req.body, next);
            res.json(user);
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userService_1.default.getAll();
            res.json(user);
        });
    }
    getOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userService_1.default.getOne(req.params.id, next);
            res.json(user);
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateUser = yield userService_1.default.update(req.body, next);
            res.json(updateUser);
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userService_1.default.delete(req.params, next);
            res.json(user);
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const login = yield userService_1.default.login(req.body, next);
            res.json(login);
        });
    }
}
exports.default = new UserController();
