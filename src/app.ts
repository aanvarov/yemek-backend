import * as express from "express";
import config from "config";
import log from "./logger";
import * as dotenv from "dotenv";
import connect from "./db/connect";
import routes from "./routes";
import { deserializeUser } from "./middleware";
import cors from "cors";
import * as socketio from "socket.io";
import * as http from "http";

dotenv.config();
const port = (process.env.PORT as any) || (config.get("port") as number);
const host = config.get("host") as string;

const app = express.default();
const server = http.createServer(app);
const io = new socketio.Server(server, {
  cors: {
    origin: "*",
  },
});
app.use(cors({ origin: true, credentials: true }));
app.use(deserializeUser);
app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello World!, This is Yemek API");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Socket io
io.on("connection", (client) => {
  log.info(client.id);
  client.on("otsimon", (data) => {
    console.log(data);
    io.emit("eshak", data);
  });
  client.on("updateFood", () => {
    console.log("updateFood status");
    io.emit("updateFoodStatus");
  });
  client.on("order-created-back", () => {
    console.log("order-created-back");
    io.emit("order-created");
  });
  client.on("orderStatus", () => {
    console.log("order-created-back");
    io.emit("order-created");
  });
  client.on("disconnect", (err) => {
    console.log(err, "error");

    /* … */
  });
});

// turbo sale
// io.on("connection", async (socket) => {
//   io.emit("totalClients", Object.keys(io.sockets.sockets).length);
//   exports.io = io;
//   exports.socket = socket;
//   socket.on("disconnect", () => {
//     io.emit("totalClients", Object.keys(io.sockets.sockets).length);
//   });
// });

server.listen(port, host, (): void => {
  log.info(`Server listening at http://${host}:${port}`);
  connect();
  routes(app);
});
