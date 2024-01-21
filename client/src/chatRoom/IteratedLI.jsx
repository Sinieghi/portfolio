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
        crudChat.fetchChat().then(() => {
          if (chatroom.block) return;
          crudChat.toNameCollector = chatroom.to.name;
          crudChat.openChat(chatroom);
          chatroom.unread = false;
        });
      }}
    >
      <div className="avatar">
        {<Avatar name={chatroom.to.name} avatar={chatroom.to.avatar} />}{" "}
      </div>
      {formatFirstName(chatroom.to.name, chatroom.to.name.length)}
    </li>
  );
};
IteratedLI.propTypes = {
  chatroom: PropTypes.object,
};
export default IteratedLI;
