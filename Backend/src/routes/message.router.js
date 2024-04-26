import { Router } from "express";
import {
  getAllMessages,
  sendMessage,
} from "../controllers/message.controller.js";
import { isadminAuthenticated } from "../middlewares/auth.js";

const router = Router();

router.route("/send").post(sendMessage);
router.route("/getAllMessages").get(isadminAuthenticated, getAllMessages);

export default router;
