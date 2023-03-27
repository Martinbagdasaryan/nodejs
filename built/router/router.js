"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controller/userController"));
const loginMiddleware_1 = __importDefault(require("../controller/loginMiddleware"));
const router = (0, express_1.default)();
router.post("/users", userController_1.default.create);
router.post("/login", userController_1.default.login);
router.get("/users", loginMiddleware_1.default, userController_1.default.getAll);
router.get("/users/:id", userController_1.default.getOne);
router.put("/users", userController_1.default.update);
router.delete("/users/:id", userController_1.default.delete);
exports.default = router;
