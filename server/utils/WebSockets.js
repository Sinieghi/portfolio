import { WebSocket } from "ws";
import { websocket } from "../app.js";

export function typingEvent(data) {
  console.log(data);

  websocket.clients.forEach((cl) => {
    if (cl.uid === data.to && cl.readyState === WebSocket.OPEN) {
      cl.send(
        JSON.stringify({
          typing: {
            isTyping: data.start,
          },
        })
      );
    }
  });
}
