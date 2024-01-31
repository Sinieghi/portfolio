import { formatFirstName } from "../utils/formatUserName";
import { crudChat } from "./HTTPrequest/CRUD";
import PropTypes from "prop-types";
import Avatar from "./component/Avatar";
const IteratedLI = ({ chatroom, state, setState }) => {
  return (
    <li
      style={{
        cursor: "pointer",
        width: "80%",
        color: chatroom.unread ? "var(--blue-ocn)" : "var(--grey-900)",
      }}
      onClick={() => {
        new Promise((resolve) => {
          crudChat.toNameCollector = chatroom.name;
          crudChat.openChat(chatroom, resolve);
        }).then(() => {
          setState({
            ...state,
            chat: crudChat.chat,
            loading: false,
            openChat: true,
          });
          chatroom.unread = false;
          crudChat.scrollToBottom();
        });
      }}
    >
      <div className="avatar">
        {<Avatar name={chatroom.name} avatar={chatroom.avatar} />}{" "}
      </div>
      {formatFirstName(chatroom.name, chatroom.name.length)}
    </li>
  );
};
IteratedLI.propTypes = {
  setState: PropTypes.func,
  state: PropTypes.object,
  chatroom: PropTypes.object,
};
export default IteratedLI;
