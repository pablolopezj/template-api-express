import { Router } from "express";
import {
  userDelete,
  userPost,
  userPut,
  usersGet,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/", usersGet);
router.put("/:id", userPut);
router.post("/", userPost);
router.delete("/", userDelete);

export { router };
