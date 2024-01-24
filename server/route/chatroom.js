import express from "express";
import { Chatroom } from "../controllers/chatroom.js";
import { Users } from "../controllers/users.js";
const router = express.Router();

router
  .route("/api/v1/chatroom/:uid")
  .get()
  .post(Chatroom.createChatroom)
  .patch();
router.route("/api/v1/messages/:uid").post();

router.route("/api/v1/user").post(Users.createUser);
router.route("/api/v1/user/list").get(Users.getUserList);

export default router;
