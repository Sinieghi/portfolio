import { timeConvertor } from "../utils/dateOrCurrencyFix";
import { formatFirstName } from "../utils/formatUserName";
import { crudChat } from "./HTTPrequest/CRUD";
// import TypingAnimated from "./TypingAnimated";

const ChatContent = (prop) => {
  return (
    <article
      className="conversation"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <>
        {prop.state.chat &&
          prop.state.chat.map((c, i) => {
            // if (c.displayTyping) return <TypingAnimated key={i} />;
            return (
              <div
                key={i}
                style={prop.styleHandler(c.identifier)}
                className="speak"
              >
                <p
                  className="name"
                  style={{
                    color: !c.identifier
                      ? "var(--blue-oc)"
                      : "var(--clr-primary-red-4)",
                  }}
                >
                  {crudChat.toName && crudChat.user && c.identifier
                    ? formatFirstName(crudChat?.toName, crudChat?.toName.length)
                    : formatFirstName(
                        crudChat?.user.name,
                        crudChat?.user.name.length
                      )}
                </p>
                <p>{c.msg}</p>
                <p className="date">{timeConvertor(c.date)}</p>
              </div>
            );
          })}
      </>
    </article>
  );
};

export default ChatContent;
