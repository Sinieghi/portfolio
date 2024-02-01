import PropTypes from "prop-types";
function RenderText({ msg }) {
  if (!msg) return msg;
  let n = msg.length;
  let httpsRef = "https";
  let link = "";
  let stStart = "";
  let s = -1;
  let e = -1;
  let str = "";
  let breakLoop = false;
  let j = 0;
  let chunks = [];

  if (n == 0) throw new Error("empty msg, shouldn't happen...");

  for (let i = 0; i < n; i++) {
    for (let u = 0; u < httpsRef.length; u++) {
      if (httpsRef[u] === msg[i + u]) stStart += msg[i + u];
      else stStart = "";
    }
    if (stStart === httpsRef) s = i;
    j = i;
    while (stStart === httpsRef && !breakLoop) {
      if (msg[j] !== " ") link += msg[j];
      else breakLoop = true;
      j++;
      if (!msg[j]) breakLoop = true;
    }
    if (findEndBoolean(msg, s, e, i)) e = i;
    if (s != -1 && e != -1) {
      chunks[chunks.length] = str;
      chunks[chunks.length] = <a href={link}>{link}</a>;
      s = -1;
      e = -1;
      breakLoop = false;
      link = "";
      str = "";
    } else if (s == -1 && e == -1) str += msg[i];
  }
  chunks[chunks.length] = str;
  return chunks.map((e, i) => {
    return <p key={i}>{e}</p>;
  });
}
function findEndBoolean(msg, s, e, i) {
  return s != -1 && (msg[i + 1] === " " || !msg[i + 1]) && e == -1;
}
RenderText.propTypes = {
  msg: PropTypes.string,
};
export default RenderText;
