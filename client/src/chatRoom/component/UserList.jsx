import styled from "styled-components";
import PropTypes from "prop-types";
import { useState } from "react";
import Avatar from "./Avatar";
import { crudChat } from "../HTTPrequest/CRUD";
import { crudUser } from "../HTTPrequest/User";

const UserList = ({ users, setState, state }) => {
  const [addContact, setAddContact] = useState(false);
  return (
    <Wrapper>
      <div className="users_container" style={{ overflowY: "scroll" }}>
        <button
          type="button"
          onClick={() =>
            setState({
              ...state,
              showUserList: false,
            })
          }
          className="btn-close"
        ></button>
        {users.map((e, i) => {
          e = isAlreadyAdded(e);
          return (
            <div
              key={i}
              className="user"
              style={{
                backgroundColor: setCardBackground(e.itsMe, e.hasAlreadyAdded),
              }}
              onClick={() => setAddContact(true)}
            >
              <div className="image_cont">
                <Avatar avatar={e.avatar} name={e.name} />
              </div>
              <div className="name-cont">
                <p>{e.name}</p>
              </div>
              {addContact && (
                <button
                  onClick={() => {
                    if (!crudUser.user) {
                      setState({ ...state, showLoginForm: true });
                      return;
                    }
                    crudChat.createChat(e);
                  }}
                  className="add_brn"
                >
                  Add
                </button>
              )}
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};
function isAlreadyAdded(user) {
  for (let i = 0; i < crudChat.chatroom.length; i++) {
    if (crudChat.chatroom[i].uid === user.uid) user.hasAlreadyAdded = true;
    if (user.uid === crudUser.user.uid) user.itsMe = true;
  }
  return user;
}
function setCardBackground(itsMe, hasAlreadyAdded) {
  console.log(itsMe, hasAlreadyAdded);
  if (hasAlreadyAdded) return "var(--primary-200)";
  if (itsMe) return "var(--primary-blue-300)";
  return "";
}
const Wrapper = styled.div`
  background-color: var(--cus-shade-for-aside-popups);
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 10;
  padding: 1rem;
  color: var(--grey-900);
  top: 0;
  .users_container {
    position: relative;
    background-color: var(--white);
    width: 30rem;
    height: 60rem;
    margin: 0 auto;
    padding: 1rem;
  }
  #cl,
  .add_brn {
    position: absolute;
  }
  #cl {
    background-color: transparent;
    top: 0;
    right: 0;
    color: black;
  }
  .add_brn {
    right: 3px;
    bottom: 3px;
    width: fit-content;
    font-size: 0.7rem;
    padding: 5px;
    border-radius: 2px;
    letter-spacing: 1px;
    background-color: var(--primary-300);
    border: transparent;
  }
  .user {
    box-shadow: var(--shadow-1);
    position: relative;
    display: flex;
    padding: 1rem;
    align-items: center;
    column-gap: 15px;
    font-size: 15px;
    font-weight: 500;
    margin: 5px 0;
    cursor: pointer;
    p {
      margin-bottom: 0;
    }
  }
`;

UserList.propTypes = {
  user: PropTypes.object,
  users: PropTypes.array,
  setState: PropTypes.func,
  state: PropTypes.object,
};
export default UserList;
