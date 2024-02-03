import PropTypes from "prop-types";
import { crudUser } from "../HTTPrequest/User";
import { useState } from "react";
const userInitial = {
  name: "",
  avatar: "",
};
const FormModal = ({ setState, state }) => {
  const [user, setUser] = useState(userInitial);
  return (
    <form
      style={{ maxWidth: "100% !important" }}
      onSubmit={(e) => {
        handleSubmit(e, user, { setState, state });
      }}
    >
      <fieldset>
        <div className="form-group">
          <label htmlFor="name" className="form-label mt-4">
            Name *
          </label>
          <input
            type="Name"
            className="form-control"
            id="name"
            name="name"
            placeholder="Enter Name"
            style={{ padding: ".75rem 0" }}
            onChange={(e) => {
              setUser((user) => {
                user.name = e.target.value;
                return user;
              });
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="formFile" className="form-label mt-4">
            Enter your avatar
          </label>
          <input
            className="form-control"
            type="file"
            id="avatar"
            name="avatar"
            style={{ padding: ".75rem 0" }}
            onChange={(e) => {
              setUser((user) => {
                user.avatar = e.target.files;
                return user;
              });
            }}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ marginTop: "5px" }}
        >
          Submit
        </button>
      </fieldset>
    </form>
  );
};
FormModal.propTypes = {
  setState: PropTypes.func,
  state: PropTypes.object,
};
function handleSubmit(e, user, reactSuper) {
  e.preventDefault();
  new Promise((resolve) => {
    crudUser.uploadAvatar(user.avatar, user.name, resolve).then(() => {});
  }).then((url) => {
    user.avatar = url.downloadURL;
    console.log(user);
    crudUser
      .createUser(user)
      .then(() => {
        reactSuper.setState({
          ...reactSuper.state,
          showLoginForm: false,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  });
}
export default FormModal;
