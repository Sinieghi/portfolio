import { formatFirstName } from "../utils/formatUserName";
import { crudChat } from "./HTTPrequest/CRUD";
import PropTypes from "prop-types";
import Avatar from "./component/Avatar";
const IteratedLI = ({ chatroom }) => {
  return (
    <li
      style={{
        cursor: "pointer",
        width: "80%",
        color: chatroom.unread ? "var(--blue-ocn)" : "var(--grey-900)",
      }}
      onClick={() => {
        crudChat.toNameCollector = chatroom.name;
        crudChat.openChat(chatroom);
        chatroom.unread = false;
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
  chatroom: PropTypes.object,
};
export default IteratedLI;
