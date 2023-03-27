import Express from "express";
import mongoose from "mongoose";
// import router from "../typeScript /router/router";
import router from "./typeScript/router/router"
import dotenv from "dotenv"
import errorMiddleware from "./typeScript/middleware/errorMiddleware";

dotenv.config()

const app = Express();
const PORT = process.env.PORT;

const url = process.env.DB_URL!;

app.use(Express.json());

app.use("/api", router);

app.use(errorMiddleware);

(async () => {
  try {
    await mongoose.connect(url);
    app.listen(PORT, () => {
      console.log(`server is runing on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
})();
