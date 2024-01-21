import chatroom from "../db/db.js";
export class Chatroom {
  createUser(req, res) {
    try {
      const user = {};
      let { userCollection } = chatroom.find("userCollection", null, {});
      user.uid = n;
      user.avatar = req.body.avatar;
      user.name = req.body.name;
      const users = chatroom.create("userCollection", user);
      console.log(userCollection);
      res.status(201).json({ user, users });
    } catch (error) {
      console.log(error);
    }
  }
  createChatroom(req, res) {
    res.status(201).json({});
  }
  sendMessage(req, res) {}
}
