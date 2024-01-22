import { isEmptyObj } from "../utils/isEmptyObj.js";
import { idGenerator } from "../utils/idGenerator.js";

class ChatSchema {
  chatroom = {
    cId: "",
    from: {
      uid: Number,
      name: "",
      avatar: null,
    },
    to: {
      uid: Number,
      name: "",
      avatar: null,
    },
  };
  msg = { msg: "", date: "", from: "", to: "" };
  user = {
    name: "",
    avatar: "",
    uid: Number,
  };
  // me = {
  //   name: "Luiz Guilherme",
  //   uid: 0,
  //   avatar:
  //     "https://firebasestorage.googleapis.com/v0/b/onfrete.appspot.com/o/WhatsApp%20Image%202023-11-28%20at%2006.47.40.jpeg?alt=media&token=2ceee553-e365-4b6a-9fae-c565a3d4097d",
  // };

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

  find(variable, field) {
    this.collectionName = variable;
    if (!field || isEmptyObj(field)) return this;
    //falta testar esses filtros que fiz
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
    return null;
  }

  findOneAndRemove(variable, field, value) {
    let a = [];
    if (!value && value != 0) return;
    console.log(variable, field, value);
    for (let i = 0; i < this[variable].length; i++) {
      console.log(this[variable][i][field], value);
      if (this[variable][i][field] !== value) a[a.length] = this[variable][i];
    }
    this[variable] = a;
    return null;
  }
}

export default new ChatSchema();
