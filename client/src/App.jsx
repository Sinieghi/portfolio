import { useEffect } from "react";
import "./App.css";
import HomePage from "./Home/HomePage";
import MenuBar from "./Menu/MenuBar";
import ChatRoom from "./chatRoom/ChatRoom";
import Certs from "./myCerts/Certs";
import { pathname } from "./utils/pathname";
import { logEvent } from "firebase/analytics";
import { analytics } from "./services/firebase";

function App() {
  useEffect(() => {
    logEvent(analytics, "page_view");
  }, []);
  return (
    <>
      <MenuBar />
      {pathname() === "/" && <HomePage />}
      {pathname() === "/messages" && <ChatRoom />}
      {pathname() === "/certificates" && <Certs />}
    </>
  );
}

export default App;
