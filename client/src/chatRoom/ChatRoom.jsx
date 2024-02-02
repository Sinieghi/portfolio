import { Component } from "react";
import { Wrapper } from "./Style/ChatRoom";
import { crudChat } from "./HTTPrequest/CRUD";
import PropTypes from "prop-types";
import ChatContent from "./ChatContent";
import IteratedLI from "./IteratedLI";
import SmallCloseBtn from "./component/SmallCloseBtn";
import LoginForm from "./component/LoginForm";
import { crudUser } from "./HTTPrequest/User";
import UserList from "./component/UserList";
import { push } from "../utils/push";
class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "",
      loading: false,
      showContact: false,
      openChat: false,
      chatroom: [],
      users: [],
      chat: [],
      changeContainers: false,
      count: 0,
      showLoginForm: true,
      showUserList: false,
    };
    this.timeout;
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({ ...this.state, msg: value });
    if (this.state.count == 0) {
      // userIsTyping(true, crudChat.to);
    }
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      // userIsTyping(false, crudChat.to);
      this.setState({ ...this.state, count: 0 });
    }, 1000 * 5);
  }
  submitBool() {
    return this.state.msg === "" || this.state.sendMessageLoading;
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.submitBool()) return;
    let msgData = {
      from: crudUser.user.uid,
      to: crudChat.to,
      date: new Date(),
      msg: this.state.msg,
    };
    this.setState({
      ...this.state,
      chat: push(this.state.chat, this.state.chat.length, msgData),
      sendMessageLoading: true,
    });
    crudChat
      .persisteConversation(msgData)
      .then(() =>
        this.setState({ ...this.state, msg: "", sendMessageLoading: false })
      )
      .catch(() => this.setState({ ...this.state, sendMessageLoading: false }));
  }

  keys(e) {
    if (e.key === "Enter") this.handleSubmit(e);
  }

  async componentDidMount() {
    crudChat.getReactInstance(this.setState.bind(this), this.state);
  }
  componentDidUpdate() {
    crudChat.getReactInstance(this.setState.bind(this), this.state);
  }

  render() {
    // console.log(this.state);
    return (
      <Wrapper className="chat_container">
        {this.state.showLoginForm && (
          <LoginForm setState={this.setState.bind(this)} state={this.state} />
        )}

        {this.state.showUserList && (
          <UserList
            setState={this.setState.bind(this)}
            state={this.state}
            user={crudUser.user}
            users={crudUser.userCollection}
          />
        )}

        <button
          className="show_contact-trigger"
          style={{
            display: this.state.showContact ? "none" : "block",
          }}
          onClick={() =>
            this.setState({
              ...this.state,
              showContact: !this.state.showContact,
            })
          }
        >
          Contatos
        </button>
        <div className="chat_aside-container">
          <div
            className={
              this.state.showContact
                ? "show_aside-content aside_content"
                : "aside_content"
            }
          >
            <button
              type="button"
              onClick={() =>
                this.setState({
                  ...this.state,
                  showContact: !this.state.showContact,
                })
              }
              style={{
                display: this.state.showContact ? "flex" : "none",
              }}
              className="btn-close"
            ></button>

            <div className="contact-container">
              <ul className="user_message-container chat-open">
                <p className="title">Talk</p>
                {this.state.loading ? null : (
                  <>
                    {this.state.chatroom && this.state.chatroom.length == 0 ? (
                      <p className="empty-conversation">Empty contacts</p>
                    ) : (
                      <>
                        {this.state.chatroom &&
                          this.state.chatroom.map((r, i) => {
                            return (
                              <div
                                className="list-container"
                                style={{
                                  backgroundColor:
                                    r.uid === crudChat.to
                                      ? "var(--clr-primary-red-3)"
                                      : "var(--white)",
                                  borderTopLeftRadius: "9px",
                                }}
                                key={i}
                              >
                                <IteratedLI
                                  chatroom={r}
                                  state={this.state}
                                  setState={this.setState.bind(this)}
                                />
                                <SmallCloseBtn
                                  handleClick={(e) => {
                                    crudChat.to = null;
                                    this.handleClickCloseChatroom(e, r);
                                  }}
                                />
                              </div>
                            );
                          })}
                      </>
                    )}
                  </>
                )}
              </ul>
            </div>
          </div>
          {this.state.openChat && (
            <ChatContent state={this.state} styleHandler={this.styleHandler} />
          )}
        </div>

        <div className="input_box">
          <button
            className="user_list"
            onClick={() => {
              crudUser.getUsers().then(() => {
                this.setState({
                  ...this.state,
                  users: crudUser.userCollection,
                  showUserList: true,
                });
              });
            }}
          >
            User list
          </button>
          <form
            onSubmit={(e) => this.handleSubmit(e)}
            onKeyDown={(e) => {
              this.keys(e);
            }}
          >
            <textarea
              type="text"
              id="text"
              name="msg"
              minLength={1}
              value={this.state.msg}
              onChange={(e) => this.handleChange(e)}
            />
            <button className="btn_hover-scale submit_message">Send</button>
          </form>
        </div>
      </Wrapper>
    );
  }
  push(u) {
    let a = [];
    let n = this.state.chatroom.length;
    for (let i = 0; i < n; i++) {
      if (i == u) a[i] = !this.state.warningBeforeAction[i];
      else a[i] = this.state.warningBeforeAction[i];
    }
    return a;
  }

  handleClickCloseChatroom() {
    crudChat.closeConversation();
  }

  styleHandler(identifier) {
    let style = {};
    if (!identifier) {
      style = {
        placeSelf: "",
        backgroundColor: "var(--grey-200)",
      };
    } else {
      style = {
        placeSelf: "self-end",
        backgroundColor: "var(--primary-blue-300)",
        color: "var(--white)",
      };
    }
    return style;
  }
  warningBeforeActionHandler(id) {
    return (
      <>
        <button
          className="confirm-action"
          onClick={() => {
            crudChat.removePermanentThisContact(id);
            this.setState({ ...this.state, warningBeforeAction: false });
          }}
        >
          Confirmar
        </button>
        <button
          className="cancel-btn"
          onClick={() =>
            this.setState({ ...this.state, warningBeforeAction: false })
          }
        >
          Cancelar
        </button>
      </>
    );
  }
}
ChatRoom.propTypes = {
  chat: PropTypes.array,
};
export default ChatRoom;
