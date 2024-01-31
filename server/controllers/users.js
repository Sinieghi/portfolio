import chatroom from "../db/db.js";
import { InternalServerError } from "../errors/InternalError.js";
import { ws } from "../index.js";
export class Users {
  static createUser(req, res) {
    try {
      const user = {};
      let { userCollection } = chatroom.find("userCollection", null);
      user.uid = userCollection.length;
      user.avatar = req.body.avatar;
      user.name = req.body.name;
      chatroom.create("userCollection", user);
      res.status(201).json({ user });
    } catch (error) {
      console.log(error);
    }
  }

  static getUserList(req, res) {
    try {
      let { userCollection } = chatroom.find("userCollection", null);
      res.status(201).json({ users: userCollection });
    } catch (error) {
      throw new InternalServerError(error);
    }
  }

  static removeUser(uid) {
    chatroom.findOneAndRemove("userCollection", "uid", uid);
  }
}
