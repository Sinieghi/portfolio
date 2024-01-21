import { sendUid } from "../../WebSocket/WebSocket";
import { findAndRemove } from "../../utils/findAndRemove";
import { isEmptyObj } from "../../utils/isEmptyObj";
import { unshift } from "../../utils/unshift";

export class User {
  userCollection = [];
  user = {};
  constructor(urls) {
    this.baseUrl = urls[0];
    this.baseMsgUrl = urls[1];
    this.baseUserUrl = urls[2];
  }

  async createUser(data) {
    fetch(this.baseUserUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    })
      .then((u) => {
        const user = JSON.parse(u);
        this.userCollection = findAndRemove(
          this.userCollection,
          this.userCollection.length,
          { var: "uid", value: user.uid }
        );
        this.userCollection = unshift(
          this.userCollection,
          this.userCollection.length,
          user
        );
        sendUid(u.uid);
      })
      .catch((e) => console.log(e));
  }

  isThereAnyUser() {
    return isEmptyObj(this.user);
  }
}
