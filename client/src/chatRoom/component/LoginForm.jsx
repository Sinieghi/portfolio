import { useState } from "react";
import { crudChat } from "../HTTPrequest/CRUD";
import PropTypes from "prop-types";
import styled from "styled-components";

const userInitial = {
  name: "",
  avatar: "",
};
const LoginForm = ({ setState, state }) => {
  const [user, setUser] = useState(userInitial);
  return (
    <Wrapper style={mountStyleBackground()}>
      <form
        style={mountStyleForm()}
        onSubmit={(e) => {
          handleSubmit(e, user, { setState, state });
        }}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          required
          min={2}
          onChange={(e) => {
            setUser((user) => {
              user.name = e.target.value;
              return user;
            });
          }}
        />
        <input
          type="file"
          name="avatar"
          id="avatar"
          onChange={(e) => {
            setUser((user) => {
              user.avatar = e.target.value;
              return user;
            });
          }}
        />
        <button>Send</button>
      </form>
    </Wrapper>
  );
};

function handleSubmit(e, user, reactSuper) {
  e.preventDefault();
  crudChat
    .createUser(user)
    .then(() => {
      reactSuper.setState({ ...reactSuper.state, showLoginForm: false });
    })
    .catch((e) => {
      console.log(e);
    });
}

function mountStyleBackground() {
  return {};
}
function mountStyleForm() {
  return {};
}
LoginForm.propTypes = {
  setState: PropTypes.func,
  state: PropTypes.object,
};

const Wrapper = styled.div`
  background-color: var(--cus-shade-for-aside-popups);
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 10;
  form {
    margin: 10rem auto;
    width: 20rem;
    height: 20rem;
    background-color: var(--white);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    color: var(--grey-900);
    #avatar {
      margin-top: 2rem;
    }
    button {
      margin-top: 3rem;
      width: fit-content;
      padding: 1rem;
      letter-spacing: 2px;
    }
  }
`;

export default LoginForm;
