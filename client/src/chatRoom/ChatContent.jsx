import { timeConvertor } from "../utils/dateOrCurrencyFix";
import { formatFirstName } from "../utils/formatUserName";
import { crudChat } from "./HTTPrequest/CRUD";
import { crudUser } from "./HTTPrequest/User";
// import TypingAnimated from "./TypingAnimated";

const ChatContent = (prop) => {
  console.log(prop.state.chat);
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
            console.log(c.msg);
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
                  {c.identifier
                    ? formatFirstName(crudChat?.toName, crudChat?.toName.length)
                    : formatFirstName(
                        crudUser?.user.name,
                        crudUser?.user.name.length
                      )}
                </p>
                {/* this is not working, anchor is just textContent here  */}
                <p>{crudChat.containsLink(c.msg)}</p>
                <p className="date">{timeConvertor(c.date)}</p>
              </div>
            );
          })}
      </>
    </article>
  );
};

export default ChatContent;
