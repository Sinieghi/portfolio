import chatroom from "../db/db.js";
import { InternalServerError } from "../errors/InternalError.js";
import { ws } from "../index.js";
export class Chatroom {
  static createChatroom(req, res) {
    res.status(201).json({});
  }
  static sendMessage(req, res) {}

  //those methods will trigger when websocket user disconnect
  static removeChatroom() {}
}
