import PropTypes from "prop-types";
import FormModal from "./FormModal";

const LoginForm = ({ setState, state }) => {
  return (
    <>
      <div className="modal" style={{ display: "block" }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create your profile</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setState({ ...state, showLoginForm: false });
                }}
              >
                <span aria-hidden="true"></span>
              </button>
            </div>
            <div className="modal-body">
              <FormModal setState={setState} state={state} />
            </div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
    </>
  );
};

LoginForm.propTypes = {
  setState: PropTypes.func,
  state: PropTypes.object,
};

export default LoginForm;
