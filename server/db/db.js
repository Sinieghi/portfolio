import { isEmptyObj } from "../utils/isEmptyObj.js";
import { idGenerator } from "../utils/idGenerator.js";

class ChatSchema {
  msg = { msg: "", date: "", from: "", to: "" };
  user = {
    name: "",
    avatar: "",
    uid: Number,
  };
  msgCollection = [];
  userCollection = [];

  create(collection, value) {
    let doc = {};
    doc.docId = idGenerator(10 ** 7, 10 ** 9);
    doc = { ...doc, ...value };
    this[collection][this[collection].length] = doc;
    return this[collection];
  }

  find(variable, field) {
    this.collectionName = variable;
    if (!field || isEmptyObj(field)) return this;

    let a = [];
    console.log(field, this[variable]);
    for (let key in field) {
      for (let i = 0; i < this[variable].length; i++) {
        if (this[variable][i][key] === field[key]) {
          a[a.length] = this[variable][i];
        }
      }
    }
    this[variable] = a;
    console.log(this[variable]);
    return this;
  }

  findChat(variable, field) {
    this.collectionName = variable;
    let a = [];
    console.log("xxx", field, this[variable]);

    for (let i = 0; i < this[variable].length; i++) {
      if (
        this[variable][i].to === field.to &&
        this[variable][i].from === field.from
      ) {
        a[a.length] = this[variable][i];
      }
    }

    this[variable] = a;
    console.log(this[variable]);
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
