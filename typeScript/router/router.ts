import Router from "express";
import userController from "../controller/userController";
import authMiddleware from "../middleware/authMiddleware";
import handler from "../utils/helpers";

const router = Router();

// Todo: change out to auth

router.post("/users",handler(userController.create));
router.post("/login",handler(userController.login));
router.get("/users", authMiddleware(["USER","ADMIN"]),handler( userController.getAll));
router.get("/users/:id", authMiddleware(["USER","ADMIN"]),handler( userController.getOne));
router.put("/users", authMiddleware(["USER","ADMIN"]), handler(userController.update));
router.delete("/users/:id", authMiddleware(["ADMIN"]),handler( userController.delete));

export default router;
