const Router = require("express");
const userController = require("./userController.js")


const router = Router();

  router.post("/users",userController.create);
  router.get("/users",userController.getAll) ;
  router.get("/users/:id", userController.getOne);
  router.delete("/users/:id",userController.delete);
  router.put("/users", userController.update); 

module.exports = router;
