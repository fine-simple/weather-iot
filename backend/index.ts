import express from "express";
import expressWs from "express-ws";
import path from "path";

const API_KEY = "tPmAT5Ab3j7F9";

type Weather = {
  temp: number;
  humidity: number;
  pressure: number;
  altitude: number;
};

const weather: Weather = {
  temp: -1,
  humidity: -1,
  pressure: -1,
  altitude: -1,
};

const data = {
  weather,
};

let app = express();
const port = process.env.PORT || 3000;

const frontEndDir = path.join(__dirname, "/../../frontend/dist");

app.use(express.static(frontEndDir));

app.use(express.json());

const appWs = expressWs(app);

app.get("/", (_, res) => {
  res.sendFile("index.html");
});

app.get("/api", (_, res) => {
  res.json(data);
});

app.post("/update", (req, res) => {
  if (req.body.api_key !== "tPmAT5Ab3j7F9") return;

  data.weather = req.body;
  console.log(req.body);
  res.sendStatus(200);
});

appWs.app.ws("/ws", (ws, r) => {
  console.log(`Connected with ${r.socket.remoteAddress}`);
  ws.on("message", msg => {
    const jsonMsg = JSON.parse(msg.toString());

    if (jsonMsg.api_key !== API_KEY) return;
    delete jsonMsg.api_key;
    data.weather = jsonMsg;
  });

  ws.on("close", () => {
    console.log(`${r.socket.remoteAddress} Connection Closed`);
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://127.0.0.1:${port}`);
});
