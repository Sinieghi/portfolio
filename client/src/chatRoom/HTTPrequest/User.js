import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { sendUid } from "../../WebSocket/WebSocket";
import { formatImageName } from "../utils/formatAvatar";

export class User {
  userCollection = [];
  user = null;
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
        sendUid(user.uid);
        window.localStorage.setItem(
          "user",
          JSON.stringify({ uid: user.uid, isLogin: true })
        );
        this.user = user;
      })
      .catch((e) => console.log(e));
  }

  async getUser(uid) {
    try {
      const res = await fetch(this.baseUserUrl + `/${uid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { user } = await res.json();
      sendUid(user.uid);
      this.user = user;
    } catch (error) {
      console.log(error);
    }
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

  async uploadAvatar(input, name) {
    const [file] = input;
    if (!file) {
      return;
    }
    //we have to break if no file
    const metadata = {
      contentType: file.type,
    };
    import("../../services/firebase").then(({ storage }) => {
      const avatarStorageRef = ref(
        storage,
        `/avatar_portfolio/avatar/` + formatImageName(name, file.type)
      );
      const uploadTask = uploadBytesResumable(avatarStorageRef, file, metadata);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            window.localStorage.setItem("imagePath", downloadURL);
            console.log("File available at", downloadURL);
          });
        }
      );
    });
  }
}
export const crudUser = new User();
