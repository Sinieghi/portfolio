import express from "express";
import { Chatroom } from "../controllers/chatroom.js";
import { Users } from "../controllers/users.js";
const router = express.Router();

router.post("/api/v1/chatroom/open", Chatroom.updateChatroomWhenOpen);
router
  .route("/api/v1/chatroom/:uid")
  .post(Chatroom.getChatMessages)
  .get()
  .patch();
router.route("/api/v1/messages").post(Chatroom.sendMessage);

router.route("/api/v1/user").post(Users.createUser);
router.route("/api/v1/user/list").get(Users.getUserList);

export default router;
