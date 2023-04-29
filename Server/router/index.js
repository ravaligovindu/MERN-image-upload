import express from "express";
import multer from "multer";
import { login } from "./login.js";
import { signup } from "./singup.js";
import { addItem } from "./addItem.js";
import { getData } from "./getList.js";
import { authentication } from "./auth.js";

const router = express.Router();

router.use("/", authentication );
router.post("/signup", signup);
router.post("/login", login);
router.post(
  "/addItem",
  multer({ dest: "./uploads" }).array("file", 1),
  addItem
);
router.get("/getItem", getData);


export default router;
