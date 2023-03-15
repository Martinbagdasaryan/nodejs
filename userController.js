const User = require("./user.js");
const UserService = require("./userService.js");

class ControllerWrapper {
  async trying(next, fn, arg) {
    try {
      const result = await fn(arg);
      return result;
    } catch (e) {
      next(e);
    }
  }
}

const wrapper = new ControllerWrapper();

class UserController {
  async create(req, res, next) {
    const user = await wrapper.trying(next, UserService.create, req.body);
    res.json(user);
  }

  async getAll(req, res, next) {
    const user = await wrapper.trying(next,UserService.getAll)
    res.json(user);
  }

  async getOne(req, res, next) {
    const user = await wrapper.trying(next, UserService.getOne, req.params.id);
    res.json(user);

  }

  async update(req, res, next) {
    const updateUser = await wrapper.trying( next,UserService.update,req.body) ;
    res.json(updateUser);
  }

  async delete(req, res, next) {
    const user = await wrapper.trying( next,UserService.delete,req.params);
    next(res.json(user));
  }
}

module.exports = new UserController();
