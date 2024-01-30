import { sendUid } from "../../WebSocket/WebSocket";
import { isEmptyObj } from "../../utils/isEmptyObj";

export class User {
  userCollection = [];
  user = {};
  constructor() {
    this.baseUserUrl = "/api/v1/user";
    this.createUser.apply;
  }

  async createUser(data) {
    fetch(this.baseUserUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    })
      .then(async (u) => {
        const { user } = await u.json();
        console.log(user);
        sendUid(user.uid);
        this.user = user;
      })
      .catch((e) => console.log(e));
  }

  async getUsers() {
    try {
      const res = await fetch(this.baseUserUrl + "/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { users } = await res.json();
      this.userCollection = users;

      return null;
    } catch (error) {
      console.log(error);
    }
  }

  isThereAnyUser() {
    return isEmptyObj(this.user);
  }
}
export const crudUser = new User();
