import chatroom from "../db/db.js";
import { InternalServerError } from "../errors/InternalError.js";
import { ws } from "../index.js";
export class Chatroom {
  static createChatroom(req, res) {
    delete req.body.toUser.docId;
    let ch = {
      from: {
        ...req.body.fromUser,
      },
      to: {
        ...req.body.toUser,
      },
    };
    const chatroomRes = chatroom.create("chatroomCollection", ch);
    console.log(chatroomRes);
    res.status(201).json({ chatroom: chatroomRes });
  }
  static sendMessage(req, res) {}

  //this methods will trigger when websocket user disconnect
  static removeChatroom() {}
}
