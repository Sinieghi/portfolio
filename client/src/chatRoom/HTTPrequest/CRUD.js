import { filter } from "../../utils/filter";
import { findAndRemoveTwoCondition } from "../../utils/findAndRemove";
import { getDateInMil } from "../../utils/getDateInMil";
import { pushBool } from "../../utils/push";
import { unshift } from "../../utils/unshift";
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
    this.chat[crudChat.chat.length] = {
      msg: state.msg,
      date: state.date,
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
  async fetchChat(uid) {
    try {
      this.setState({ ...this.state, loading: true });
      const res = await fetch(this.baseUrl + `/uid=${uid}` + `?to=${this.to}`);
      //só para não ter erro no console
      if (!res.data) return;
      this.blocklist = filter(res.data.chatroom, res.data.chatroom.length, {
        value: true,
        var: "block",
      });
      this.chatroom = findAndRemoveTwoCondition(
        res.data.chatroom,
        res.data.chatroom.length,
        { value: [false, true], var: ["hide", "block"] }
      );
      this.status = res.status;
      this.setState({
        ...this.state,
        loading: false,
        chatroom: this.chatroom,
        blocklist: this.blocklist,
        warningBeforeAction: pushBool(this.chatroom.length, false),
      });
    } catch (error) {
      this.setState({ ...this.state, loading: false });
      console.log(error);
    }
  }

  async createChat(toUser) {
    this.to = toUser.to;
    const { b, i } = this.getChatroom();
    if (b) this.chatroom[i] = { toUser, fromUser: this.user };
    else this.chatroom[this.chatroom.length] = { toUser, fromUser: this.user };
  }

  async persisteConversation(data) {
    try {
      this.setState({ ...this.state, loading: true });
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

  async fetchMsgsToMe() {
    try {
      this.setState({ ...this.state, loading: true });
      const res = await fetch(
        this.baseUrl + "/received-message" + `?to=${this.to}`
      );
      this.toMeChat = res.data.chatroom;
      setTimeout(() => this.setState({ ...this.state, loading: false }));
      return res.status;
    } catch (error) {
      this.setState({ ...this.state, loading: false });
      console.log(error);
    }
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
    if (!this.to || !this.chatroom || this.chatroom.length == 0) return null;
    let i = this.getChatroom().i;
    this.receiver = this.chatroom[i].to.name;
    if (this.boolHandler(i)) {
      this.chat = this.toMeChat.chat;
    } else if (this.boolHandle(i)) {
      this.chat = this.chatroom[i].chat;
    } else {
      this.checkIfIsNewContact(i);
      this.chat = RequestHandler.mergeMessageOperation(
        this.chatroom[i].chat,
        this.chatroom[i].chat.length,
        this.toMeChat && this.toMeChat.chat,
        this.toMeChat && this.toMeChat.chat.length,
        true
      );
    }
  }

  //método responsável por entregar a posição do chatroom em que está aberto
  getChatroom() {
    if (!this.chatroom) return { i: undefined, b: false };
    let n = this.chatroom.length;
    let i = 0;
    let b = false;
    for (i; i < n; i++) {
      if (this.to === this.chatroom[i].to.uid) {
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

  async openChat(chatroom) {
    this.setState({
      ...this.state,
      loading: true,
    });
    if (chatroom) {
      let _id = chatroom.to._id || chatroom.to;
      crudChat.getToId(_id);
    }
    if (chatroom && chatroom.hide) {
      await this.setThisChatroom(chatroom, !chatroom.hide).then(async () => {
        await crudChat.fetchMsgsToMe().then(() => {
          this.openHandler();
        });
      });
    } else {
      await crudChat.fetchMsgsToMe().then(() => {
        this.openHandler();
      });
    }
  }

  //acredito que o defineConversation está no timing errado, tem que realocar a inicialização dele
  openHandler() {
    this.defineCurrentConversation();
    setTimeout(() => {
      this.setState({
        ...this.state,
        chat: this.chat,
        loading: false,
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

  //vou deixar essa ideia para depois de puxar a versão atual, pois vai demorar para implementar isso
  userIsTyping(typing) {
    if (typing.isTyping) {
      this.chat[this.chat.length] = {
        displayTyping: typing.isTyping,
        identifier: true,
      };
    } else {
      delete this.chat[this.chat.length - 1];
    }
    if (typeof this.setState !== "function") return;
    this.setState({
      ...this.state,
      chat: this.chat,
    });
    this.scrollToBottom();
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
    return { str };
  }
  findEndBoolean(msg, s, e, i) {
    return s != -1 && (msg[i + 1] === " " || !msg[i + 1]) && e == -1;
  }
}

export const crudChat = new RequestHandler();

let s =
  "https://onfrete.web.app ASKNBDOksbfo https://onfrete.web.app sbPABF APSBF OAISBFOIsb https://onfrete.web.app/cadastro oiabszofabsgoia dasmn dkasnd´knas´dknandsandoans´d ans´do nosndoans´ns´dn ásndoaknoaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasdsa https://www.google.com/search?client=firefox-b-d&q=google+tradutor dslakndlk absdbaljbd kajsbdj baskbdkab kasbdbka https://web.whatsapp.com/";
console.log(crudChat.containsLink(s));
console.log(s[53], s[75]);
