import { Request, Response } from "express";
import UserService from "../service/userService";

class UserController {
  async create(req: Request, res: Response) {
    const user = await UserService.create(req.body);
    return res.json(user);
  }

  async getAll(req: Request, res: Response) {
    const user = await UserService.getAll();
    return res.json(user);
  }

  async getOne(req: Request, res: Response) {
    const user = await UserService.getOne(req.params.id);
    return res.json(user);
  }

  async update(req: Request, res: Response) {
    const updateUser = await UserService.update(req.body);
    return res.json(updateUser);
  }

  async delete(req: Request, res: Response) {
    const user = await UserService.delete(req.params.id);
    return res.json(user);
  }

  async login(req: Request, res: Response) {
    const login = await UserService.login(req.body);
    return res.json(login);
  }
}

export default new UserController();
