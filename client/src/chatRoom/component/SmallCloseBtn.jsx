const SmallCloseBtn = (prop) => {
  return (
    <button
      type="button"
      onClick={(e) => {
        prop.handleClick(e);
      }}
      style={{
        fontSize: "1.5rem",
        width: "4rem",
        height: "4rem",
        transition: "all .1s ease",
        margin: "0",
        color: "var(--grey-900)",
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = "var(--grey-300)";
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = "transparent";
      }}
      className="btn-close"
    ></button>
  );
};

export default SmallCloseBtn;
