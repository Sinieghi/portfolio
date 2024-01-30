import { findAndRemove } from "../../utils/findAndRemove";
import { getDateInMil } from "../../utils/getDateInMil";
import { unshift } from "../../utils/unshift";
import { crudUser } from "./User";
class RequestHandler {
  constructor() {
    this.baseUrl = "/api/v1/chatroom";
    this.baseMsgUrl = "/api/v1/messages";
  }
  msg = "";
  to;
  chat = [];
  toMeChat = null;
  blocklist = [];
  chatroom = [];
  set setUser(val) {
    this.user = val;
  }
  set toNameCollector(val) {
    this.toName = val;
  }
  updateMyChatroomWhenSendingMessage(state) {
    this.chat[this.chat.length] = {
      ...state.msgData,
    };
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
    this.to = toUser.to;
    this.chatroom = findAndRemove(this.chatroom, this.chatroom.length, {
      var: "uid",
      value: toUser.uid,
    });
    this.chatroom = unshift(this.chatroom, this.chatroom.length, toUser);
    this.setState({ ...this.state, chatroom: this.chatroom });
  }

  async fetchMsgsToMe() {
    try {
      this.setState({ ...this.state, loading: true });
      const res = await fetch(this.baseUrl + `/${crudUser.user.uid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid: this.to }),
      });
      const data = await res.json();
      this.chat = data.chat;
      this.toMeChat = data.toMeChat;

      setTimeout(() => this.setState({ ...this.state, loading: false }));
      return res.status;
    } catch (error) {
      this.setState({ ...this.state, loading: false });
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
        this.setState({ ...this.state, loading: false });
        this.scrollToBottom();
      });
    } catch (error) {
      console.log(error);
      this.setState({ ...this.state, loading: false });
    }
  }

  async getToId(id) {
    this.to = id;
  }

  closeConversation() {
    this.chat = [];
    this.setState({
      ...this.state,
      chat: this.chat,
    });
  }

  static mergeMessageOperation(a, n, t, r) {
    if (n == 0 || r == 0) return [];
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

  defineCurrentConversation() {
    let { i } = this.getChatroom();
    this.receiver = this.chatroom[i].name;
    this.checkIfIsNewContact(i);
    this.chat = RequestHandler.mergeMessageOperation(
      this.chat,
      this.chat.length,
      this.toMeChat,
      this.toMeChat.length
    );
    console.log(this);
  }

  //método responsável por entregar a posição do chatroom em que está aberto
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
  setAsUnread(chatSender, currentChat) {
    let i = 0;
    if (currentChat && chatSender._id === currentChat._id) return;

    for (i = 0; i < this.chatroom.length; i++) {
      if (chatSender._id === this.chatroom[i]._id) {
        this.chatroom[i].unread = chatSender.unread;
      }
    }

    if (typeof this.setState !== "function") return;

    this.setState({
      ...this.state,
      chatroom: this.chatroom,
    });
  }

  orderInRealTimeChat(incomeChat) {
    let { i, b } = this.getChatroom();
    let hasChat = b;
    this.setAsUnread(incomeChat.chatSender, this.chatroom[i]);
    //aqui é onde eu confiro se o chat com o user quer está mandando msg está aberto, importante para as notificações
    if (hasChat) {
      this.chatroom[i].unread = false;
      this.chatroom[i].chat[this.chatroom[i].chat.length] =
        incomeChat.chatSender;
    }

    if (incomeChat.chatSender.from === this.to) {
      this.chat[this.chat.length] = incomeChat.chatSender;
      if (typeof this.setState !== "function") return;
      this.setState({
        ...this.state,
        chat: this.chat,
      });
      this.scrollToBottom();
    }
  }

  boolHandle(i) {
    if (
      this.toMeChat &&
      this.toMeChat.chat.length == 0 &&
      this.chatroom[i].chat.length > 0
    )
      return true;
    else false;
  }
  boolHandler(i) {
    if (
      this.toMeChat &&
      this.toMeChat.chat.length > 0 &&
      this.chatroom[i].chat.length == 0
    )
      return true;
    return false;
  }

  newIncomeContactList(newContact) {
    if (!this.chatroom) return;
    this.chatroom = unshift(this.chatroom, this.chatroom.length, newContact);
    this.setState({ ...this.state, chatroom: this.chatroom });
  }

  getReactInstance(setState, state) {
    this.state = state;
    this.setState = setState;
  }

  async openChat(userFromList) {
    this.setState({
      ...this.state,
      loading: true,
    });

    crudChat.getToId(userFromList.uid);

    await crudChat.fetchMsgsToMe().then(() => {
      this.openHandler(userFromList);
    });
  }

  openHandler(userFromList) {
    this.defineCurrentConversation();
    this.receiver = userFromList.name;
    setTimeout(() => {
      this.setState({
        ...this.state,
        chat: this.chat,
        loading: false,
        openChat: true,
      });
      this.scrollToBottom();
    });
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

  containsLink(msg) {
    let n = msg.length;
    let httpsRef = "https";
    let link = "";
    let stStart = "";
    let s = -1;
    let e = -1;
    let str = "";
    let breakLoop = false;
    let j = 0;
    console.log(n);
    if (n == 0) throw new Error("empty msg, shouldn't happen...");

    for (let i = 0; i < n; i++) {
      for (let u = 0; u < httpsRef.length; u++) {
        if (httpsRef[u] === msg[i + u]) stStart += msg[i + u];
        else stStart = "";
      }
      if (stStart === httpsRef) s = i;
      j = i;
      while (stStart === httpsRef && !breakLoop) {
        if (msg[j] !== " ") link += msg[j];
        else breakLoop = true;
        j++;
        if (!msg[j]) breakLoop = true;
      }
      if (this.findEndBoolean(msg, s, e, i)) e = i;
      if (s != -1 && e != -1) {
        str += `<a href=${link}>${link}`;
        str += `</a>`;
        s = -1;
        e = -1;
        breakLoop = false;
        link = "";
      } else if (s == -1 && e == -1) str += msg[i];
    }
    //need to replace those positions with link <a></a>
    console.log(s, e);
    return str;
  }
  findEndBoolean(msg, s, e, i) {
    return s != -1 && (msg[i + 1] === " " || !msg[i + 1]) && e == -1;
  }
}

export const crudChat = new RequestHandler();

// let s =
//   "https://onfrete.web.app ASKNBDOksbfo https://onfrete.web.app sbPABF APSBF OAISBFOIsb https://onfrete.web.app/cadastro oiabszofabsgoia dasmn dkasnd´knas´dknandsandoans´d ans´do nosndoans´ns´dn ásndoaknoaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasdsa https://www.google.com/search?client=firefox-b-d&q=google+tradutor dslakndlk absdbaljbd kajsbdj baskbdkab kasbdbka https://web.whatsapp.com/";
// console.log(crudChat.containsLink(s));
// console.log(s[53], s[75]);
