import express from "express";
import dotenv from "dotenv";
dotenv.config();
import path, { dirname } from "path";
import { corsConfig } from "./utils/corsConfig.js";
import { errorHandlerMiddleware } from "./middleware/error-handler.js";
import { notFound } from "./middleware/not-found.js";
import { fileURLToPath } from "url";
import { WebSocketServer } from "ws";
import chatRoute from "./route/chatroom.js";
import chat from "./db/db.js";
import { Users } from "./controllers/users.js";
import { connectToCluster } from "./db/connect.js";
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(corsConfig);
app.use(express.json());
app.use(chatRoute);
app.use(express.static(path.resolve(__dirname, "../public")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client", "index.html"));
});
app.use(notFound);
app.use(errorHandlerMiddleware);
const port = 8000;
export const server = app.listen(port, () => console.log(`on ${port}`));
export const mongoClient = await connectToCluster(process.env.MONGO_URI);
export const ws = new WebSocketServer({ server });
ws.on("connection", function connection(ws, wsReq) {
  console.log("Connected");
  ws.onmessage = function (e) {
    console.log(JSON.parse(e.data));
    try {
      ws.uid = JSON.parse(e.data).uid;
    } catch (error) {
      console.log(error);
    }
  };
  ws.onclose = function (ws) {
    Users.removeUser(ws.target.uid);
  };
});

chat.find("userCollection", null, {}).limit(5);
console.log();
