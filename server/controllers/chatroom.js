import chatroom from "../db/db.js";
import { ws } from "../index.js";

export class Chatroom {
  static async sendMessage(req, res) {
    chatroom.create("msgCollection", req.body.msgData);
    ws.clients.forEach((cl) => {
      if (cl.uid === req.body.msgData.to && cl.readyState === WebSocket.OPEN) {
        cl.send(
          JSON.stringify({
            msg: {
              ...req.body.msgData,
              identifier: true,
              unread: true,
            },
          })
        );
      }
    });
    res.sendStatus(201);
  }

  static getChatMessages(req, res) {
    console.log(req.body, req.params);
    const toMeChat = chatroom.findChat("msgCollection", {
      from: req.body.uid,
      to: JSON.parse(req.params.uid),
    });
    const chat = chatroom.findChat("msgCollection", {
      from: JSON.parse(req.params.uid),
      to: req.body.uid,
    });
    res
      .status(201)
      .json({ chat: chat.msgCollection, toMeChat: toMeChat.msgCollection });
  }

  //this methods will trigger when websocket user disconnect
  static removeChatroom() {}
}
