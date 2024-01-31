import { WebSocket } from "ws";
import chatroom from "../db/db.js";
import { ws } from "../index.js";

export class Chatroom {
  static async sendMessage(req, res) {
    chatroom.create("msgCollection", req.body);
    ws.clients.forEach((cl) => {
      if (cl.uid === req.body.to && cl.readyState === WebSocket.OPEN) {
        cl.send(
          JSON.stringify({
            msgBody: {
              ...req.body,
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
    const toMeChat = chatroom.findChat("msgCollection", {
      from: req.body.uid,
      to: JSON.parse(req.params.uid),
    }).collection;
    const chat = chatroom.findChat("msgCollection", {
      from: JSON.parse(req.params.uid),
      to: req.body.uid,
    }).collection;
    res.status(201).json({ chat: chat, toMeChat: toMeChat });
  }

  static updateChatroomWhenOpen(req, res) {
    ws.clients.forEach((cl) => {
      if (cl.uid === req.body.toUserId && cl.readyState === WebSocket.OPEN) {
        delete req.body.toUserId;
        cl.send(
          JSON.stringify({
            chatroomWasOpen: {
              ...req.body,
              newContact: true,
            },
          })
        );
      }
    });
    res.sendStatus(201);
  }

  //this methods will trigger when websocket user disconnect
  static removeChatroom() {}
}
