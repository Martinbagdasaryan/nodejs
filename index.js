const express = require("express");
const mongoose = require("mongoose");
const router = require("./router.js");

const app = express();
const port = 5000;
const url = `mongodb://localhost:27017/local`;

app.use(express.json());
app.use("/api", router);

(async () => {
  try {
    await mongoose.connect(url);
    app.listen(port, () => {
      console.log(`server is runing on port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
})();
