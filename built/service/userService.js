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
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("../model/user"));
const userLogin_1 = __importDefault(require("../model/userLogin"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const ObjectId = mongoose_1.default.Types.ObjectId;
const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles,
    };
    return jsonwebtoken_1.default.sign(payload, config_1.secret, { expiresIn: "24h" });
};
class UserService {
    create(data, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.name)
                return next({ message: "The name field is required.", status: 400 });
            if (!data.surname)
                return next({ message: "The surname field is required.", status: 400 });
            if (!data.password)
                return next({ message: "The password field is required.", status: 400 });
            if (!data.email)
                return next({ message: "The email field is required.", status: 400 });
            const users = yield user_1.default.find();
            let g = 0;
            for (let i = 0; i < users.length; i++) {
                if (users[i].email === data.email) {
                    g += 1;
                }
            }
            if (g >= 1) {
                return next({ message: "senc user ka ", status: 400 });
            }
            const { name, surname, password, email, roles } = data;
            const hashPassword = bcrypt_1.default.hashSync(password, 7);
            const userRole = (yield userLogin_1.default.findOne({ value: "USER" }));
            const user = yield user_1.default.create({
                name,
                surname,
                password: hashPassword,
                email,
                roles: [userRole],
            });
            yield user.save();
            if (!user)
                return next({ message: "User can not be created.", status: 500 });
            return { message: "user grancvec" };
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.default.find();
            return user;
        });
    }
    getOne(pa, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!pa)
                return next(new Error("is not id"));
            const users = yield user_1.default.find();
            let g = 0;
            for (let i = 0; i < users.length; i++) {
                if (pa === users[i]._id.toString()) {
                    g += 1;
                }
            }
            if (g === 0)
                return next({ message: "User false id.", status: 500 });
            const user = yield user_1.default.findById(pa);
            return user;
        });
    }
    update(user, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_1.default.find();
            let g = 0, c = 1;
            for (let i = 0; i < users.length; i++) {
                if (user.id === users[i]._id.toString()) {
                    g += 1;
                }
                if (user.password === users[i].password) {
                    c -= 1;
                }
            }
            if (g === 0)
                return next({ message: "User false id.", status: 500 });
            if (c === 1)
                return next({ message: "User uje ka poxi parolt.", status: 500 });
            if (!user.id)
                return next({ message: "is not id", status: 600 });
            const updateUser = yield user_1.default.findByIdAndUpdate(user.id, user, {
                new: true,
            });
            return updateUser;
        });
    }
    delete(id, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id)
                return next({ message: "is not id", status: 600 });
            const user = yield user_1.default.findByIdAndDelete(new ObjectId(id));
            return user;
        });
    }
    login(login, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = login;
            const user = yield user_1.default.findOne({ email });
            const validPossword = bcrypt_1.default.compareSync(password, user.password);
            const token = generateAccessToken(user, user.roles);
            if (validPossword === false)
                return next({ message: "senc user chka petka grancvi ", status: 600 });
            return { token };
        });
    }
}
exports.default = new UserService();
