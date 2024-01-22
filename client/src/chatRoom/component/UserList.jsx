import styled from "styled-components";
import PropTypes from "prop-types";
import { useState } from "react";
import Avatar from "./Avatar";
import { crudChat } from "../HTTPrequest/CRUD";

const UserList = ({ users, setState, state, user }) => {
  const [addContact, setAddContact] = useState(false);
  return users.map((e, i) => {
    console.log(e);
    return (
      <Wrapper key={i} onClick={() => setAddContact(true)}>
        <button
          type="button"
          onClick={() =>
            setState({
              ...state,
              showUserList: false,
            })
          }
          className="close"
          id="cl"
        >
          &times;
        </button>
        <div className="image_cont">
          <Avatar avatar={e.avatar} name={e.name} />
        </div>
        {addContact && (
          <button
            onClick={() => crudChat.createChat({ from: user.uid, to: e.uid })}
          >
            Add
          </button>
        )}
      </Wrapper>
    );
  });
};

const Wrapper = styled.div``;

UserList.propTypes = {
  user: PropTypes.object,
  users: PropTypes.array,
  setState: PropTypes.func,
  state: PropTypes.object,
};
export default UserList;
