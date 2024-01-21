import { isEmptyObj } from "../utils/isEmptyObj.js";
import { idGenerator } from "../utils/idGenerator.js";

class ChatSchema {
  chatroom = {
    cId: "",
    from: {
      name: "",
      avatar: "",
    },
    to: {
      name: "",
      avatar: "",
    },
  };
  msg = { msg: "", date: "", from: 1, to: "" };
  user = {
    name: "",
    avatar: "",
    uid: Number,
  };
  me = {
    name: "Luiz Guilherme",
    uid: 1,
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/onfrete.appspot.com/o/WhatsApp%20Image%202023-11-28%20at%2006.47.40.jpeg?alt=media&token=2ceee553-e365-4b6a-9fae-c565a3d4097d",
  };

  msgCollection = [];
  chatroomCollection = [];
  userCollection = [];

  create(variable, value) {
    let doc = {};
    doc.docId = idGenerator(10 ** 7, 10 ** 9);
    doc = { ...doc, ...value };
    this[variable][this[variable].length] = doc;
    return this[variable];
  }

  find(variable, field, value) {
    this.collectionName = variable;
    if (this.typeofBoolean(value)) return this;
    if (isEmptyObj(value)) {
      return this;
    }
    //falta testar esses filtros que fiz
    if (!field) return this;
    if (isEmptyObj(field)) return this;
    let a = [];
    console.log(field, this[variable]);
    for (let key in field) {
      for (let i = 0; i < this[variable].length; i++) {
        if (this[variable][i][key] === field[key]) {
          a[a.length] = this[variable][i][key];
        }
      }
    }

    this[variable] = a;
    return this;
  }

  limit(lm) {
    let a = [];
    if (this[this.collectionName].length <= lm) return this;
    for (let i = 0; i < lm; i++) {
      a[i] = this[this.collectionName][i];
    }
    this[this.collectionName] = a;
    return this;
  }

  findOne(variable, field, value) {
    if (value.length > 0) {
      for (let i = 0; i < this[variable].length; i++) {
        if (this[variable][i][field] === value) return this[variable][i];
      }
    }
  }

  typeofBoolean(val) {
    return val !== "" || typeof val !== "undefined" || !isEmptyObj(val);
  }
}

export default new ChatSchema();
