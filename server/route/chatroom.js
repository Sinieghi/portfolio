import express from "express";
import { Chatroom } from "../controllers/chatroom.js";
const router = express.Router();

router.route("/api/v1/chatroom/:uid").get().post().patch();
router.route("/api/v1/messages/:uid").post();

router.route("/api/v1/user").post(new Chatroom().createUser);

export default router;
