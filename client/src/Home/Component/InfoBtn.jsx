import { useState } from "react";
import { pathname } from "../../utils/pathname";

const InfoBtn = () => {
  const [dropdown, setDropdown] = useState(false);
  return (
    <>
      {/* <div
        className="btn-group"
        role="group"
        aria-label="Button group with nested dropdown"
      >
        <button type="button" className="btn btn-primary">
          Primary
        </button>
        <div className="btn-group" role="group">
          <button
            id="btnGroupDrop1"
            type="button"
            className="btn btn-primary dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          ></button>
          <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
            <a className="dropdown-item" href="#">
              Dropdown link
            </a>
            <a className="dropdown-item" href="#">
              Dropdown link
            </a>
          </div>
        </div>
      </div>
      <div
        className="btn-group"
        role="group"
        aria-label="Button group with nested dropdown"
      >
        <button type="button" className="btn btn-success">
          Success
        </button>
        <div className="btn-group" role="group">
          <button
            id="btnGroupDrop2"
            type="button"
            className="btn btn-success dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          ></button>
          <div className="dropdown-menu" aria-labelledby="btnGroupDrop2">
            <a className="dropdown-item" href="#">
              Dropdown link
            </a>
            <a className="dropdown-item" href="#">
              Dropdown link
            </a>
          </div>
        </div>
      </div> */}

      {pathname() === "/" && (
        <div
          className="btn-group"
          role="group"
          aria-label="Button group with nested dropdown"
        >
          <button type="button" className="btn btn-info">
            Info
          </button>
          <div className="btn-group" role="group">
            <button
              id="btnGroupDrop3"
              type="button"
              className={
                dropdown
                  ? "btn btn-info dropdown-toggle show"
                  : "btn btn-info dropdown-toggle"
              }
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="true"
              onClick={() => setDropdown(!dropdown)}
            ></button>
            <div
              className={dropdown ? "dropdown-menu show" : "dropdown-menu"}
              aria-labelledby="btnGroupDrop3"
              style={{
                position: "absolute",
                inset: "0px auto auto 0px",
                margin: "0px",
                transform: "translate(0px, 50px)",
              }}
              data-popper-placement="bottom-start"
            >
              <a className="dropdown-item" href="#">
                Dropdown link
              </a>
              <a className="dropdown-item" href="#">
                Dropdown link
              </a>
            </div>
          </div>
        </div>
      )}

      {/* <div
        className="btn-group"
        role="group"
        aria-label="Button group with nested dropdown"
      >
        <button type="button" className="btn btn-danger">
          Danger
        </button>
        <div className="btn-group" role="group">
          <button
            id="btnGroupDrop4"
            type="button"
            className="btn btn-danger dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          ></button>
          <div className="dropdown-menu" aria-labelledby="btnGroupDrop4">
            <a className="dropdown-item" href="#">
              Dropdown link
            </a>
            <a className="dropdown-item" href="#">
              Dropdown link
            </a>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default InfoBtn;
