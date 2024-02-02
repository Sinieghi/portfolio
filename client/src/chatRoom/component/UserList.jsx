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
          return (
            <div key={i} className="user" onClick={() => setAddContact(true)}>
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
  }
`;

UserList.propTypes = {
  user: PropTypes.object,
  users: PropTypes.array,
  setState: PropTypes.func,
  state: PropTypes.object,
};
export default UserList;
