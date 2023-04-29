import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import router from "./router/index.js";

const app = express();

mongoose
  .connect
  //dg configuration need to add here...
  ();

app.use(cors());
app.use(express.static("uploads")); //to access folder
app.use(bodyParser.json());
app.use("/", router); //routers

app.listen(8000, () => {
  console.log("Server is Runing On port 8000");
});
