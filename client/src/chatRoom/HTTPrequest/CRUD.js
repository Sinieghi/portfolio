import { findAndRemove } from "../../utils/findAndRemove";
import { findOne } from "../../utils/findOne";
import { getDateInMil } from "../../utils/getDateInMil";
import { push } from "../../utils/push";
import { unshift } from "../../utils/unshift";
import { crudUser } from "./User";
class RequestHandler {
  constructor() {
    this.baseUrl = "http://localhost:8000/api/v1/chatroom";
    this.baseMsgUrl = "http://localhost:8000/api/v1/messages";
  }
  msg = "";
  to;
  chatroom = [];

  set toNameCollector(val) {
    this.toName = val;
  }

  checkIfIsNewContact(position) {
    if (this.chatroom[position].newContact)
      this.chatroom[position].newContact = false;
  }
  collectDataToCreateChatroom(incomeUid) {
    this.to = incomeUid;
    this.createChat();
  }

  async createChat(toUser) {
    if (crudUser.user.uid === toUser.uid) return;
    this.to = toUser.uid;

    fetch(this.baseUrl + `/open`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...crudUser.user, toUserId: toUser.uid }),
    }).then(() => {
      this.chatroom = findAndRemove(this.chatroom, this.chatroom.length, {
        var: "uid",
        value: toUser.uid,
      });
      this.chatroom = unshift(this.chatroom, this.chatroom.length, toUser);
      this.setState({ ...this.state, chatroom: this.chatroom });
    });
  }

  async fetchMsgsToMe() {
    try {
      const res = await fetch(this.baseUrl + `/${crudUser.user.uid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid: this.to }),
      });
      const data = await res.json();
      const myChat = data.chat;
      const toMeChat = data.toMeChat;
      for (let i = 0; i < toMeChat.length; i++) {
        toMeChat[i].identifier = true;
      }
      return { myChat, toMeChat };
    } catch (error) {
      console.log(error);
    }
  }

  async persisteConversation(data) {
    try {
      await fetch(this.baseMsgUrl, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => {
        this.scrollToBottom();
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getToId(id) {
    this.to = id;
  }

  closeConversation() {
    this.to = null;
    this.setState({
      ...this.state,
      chat: [],
    });
  }

  static mergeMessageOperation(a, n, t, r) {
    if (n == 0) return t;
    else if (r == 0) return a;
    let mA = [];
    let u = [];
    let i = 0;
    let j = 0;
    let m = 0;
    for (i; i < n; i++) {
      mA[i] = a[i];
    }
    let l = mA.length;
    for (i = 0; i < r; i++) {
      mA[l + i] = { ...t[i] };
    }
    l = n + r;
    for (i = 0; i < l; i++) {
      m = i;
      for (j = i + 1; j < l; j++) {
        if (getDateInMil(mA[j].date) < getDateInMil(mA[m].date)) {
          m = j;
        }
      }
      u[i] = mA[m];
      mA[m] = mA[i];
    }
    return u;
  }

  defineCurrentConversation(chats) {
    let { i } = this.getChatroom();
    this.receiver = this.chatroom[i].name;
    this.checkIfIsNewContact(i);
    return RequestHandler.mergeMessageOperation(
      chats.myChat,
      chats.myChat.length,
      chats.toMeChat,
      chats.toMeChat.length
    );
  }

  //método responsável por entregar a posição do chatroom aberto
  getChatroom() {
    if (!this.chatroom) return { i: undefined, b: false };
    let n = this.chatroom.length;
    let i = 0;
    let b = false;
    for (i; i < n; i++) {
      if (this.to === this.chatroom[i].uid) {
        b = true;
        break;
      }
    }
    return { i, b };
  }

  //função de atribuir o unread ao chatroom não aberto
  setAsUnread(msgBody, currentChat) {
    let i = 0;
    if (currentChat && msgBody.to === currentChat.uid) return;

    for (i = 0; i < this.chatroom.length; i++) {
      if (msgBody.from === this.chatroom[i].uid) {
        this.chatroom[i].unread = true;
      }
    }

    if (typeof this.setState !== "function") return;

    this.setState({
      ...this.state,
      chatroom: this.chatroom,
    });
  }

  orderInRealTimeChat(msgBody) {
    let { i, b } = this.getChatroom();
    let hasChat = b;
    this.setAsUnread(msgBody, this.chatroom[i]);
    if (this.boolForNewMsg(this.chatroom[i], msgBody, hasChat)) {
      this.chatroom[i].unread = false;
      this.setState({
        ...this.state,
        chat: push(this.state.chat, this.state.chat.length, msgBody),
        chatroom: this.chatroom,
      });
      this.scrollToBottom();
    }
  }
  boolForNewMsg(currentConversation, msgBody, hasChat) {
    return (
      hasChat &&
      typeof this.setState === "function" &&
      currentConversation.uid == msgBody.from
    );
  }

  newIncomeChatroom(chatroomWasOpen) {
    if (findOne(this.chatroom, chatroomWasOpen.uid, "uid")) return;
    this.chatroom = unshift(
      this.chatroom,
      this.chatroom.length,
      chatroomWasOpen
    );
    this.setState({ ...this.state, chatroom: this.chatroom });
  }

  getReactInstance(setState, state) {
    this.state = state;
    this.setState = setState;
  }

  async openChat(userFromList, resolve) {
    this.getToId(userFromList.uid);
    //notes for commit: change the way i operate the chat obj, now is more readable
    this.fetchMsgsToMe().then(({ toMeChat, myChat }) => {
      this.openHandler(userFromList, resolve, { toMeChat, myChat });
    });
  }

  openHandler(userFromList, resolve, chats) {
    const chat = this.defineCurrentConversation(chats);
    this.receiver = userFromList.name;
    resolve({ chat });
  }

  scrollToBottom() {
    setTimeout(() => {
      const scrollControl = document.querySelector(".conversation");
      if (!scrollControl) return;
      scrollControl.scrollTo({
        behavior: "smooth",
        top: scrollControl.scrollHeight,
      });
    });
  }
}

export const crudChat = new RequestHandler();

// let s =
//   "https://onfrete.web.app ASKNBDOksbfo https://onfrete.web.app sbPABF APSBF OAISBFOIsb https://onfrete.web.app/cadastro oiabszofabsgoia dasmn dkasnd´knas´dknandsandoans´d ans´do nosndoans´ns´dn ásndoaknoaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasdsa https://www.google.com/search?client=firefox-b-d&q=google+tradutor dslakndlk absdbaljbd kajsbdj baskbdkab kasbdbka https://web.whatsapp.com/";
// console.log(crudChat.containsLink(s));
// console.log(s[53], s[75]);
