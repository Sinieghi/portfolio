import { crudChat } from "../chatRoom/HTTPrequest/CRUD";
export const ws = new WebSocket("ws://localhost:8000");

ws.onmessage = function (e) {
  const data = JSON.parse(e.data);
  console.log(data);
  if (data.msgBody) {
    crudChat.orderInRealTimeChat(data.msgBody);
  } else if (data.removedContactTo) {
    crudChat.removeContactFromList(data.removedContactTo);
  } else if (data.chatroomWasOpen) {
    crudChat.newIncomeChatroom(data.chatroomWasOpen);
  }
};

export function sendUid(id) {
  try {
    if (ws.readyState == 0) return;

    console.log(id);
    ws.send(JSON.stringify({ uid: id }));
  } catch (error) {
    console.log(error);
  }
}

export function userIsTyping(start, to) {
  if (!to) return;
  if (start) ws.send(JSON.stringify({ event: "typing", start: true, to }));
  else ws.send(JSON.stringify({ event: "typing", start: false, to }));
}
