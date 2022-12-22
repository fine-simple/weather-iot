import { sendMail } from "./email";
import express from "express";
import expressWs from "express-ws";
import path from "path";

const API_KEY = "tPmAT5Ab3j7F9";

const weather: Weather = {
  temp: -1,
  humidity: -1,
  pressure: -1,
  altitude: -1,
};

const thresholds = {
  temp: 30,
  humidity: 65,
  pressure: 102000,
  altitude: 80,
};

const data = {
  weather,
  thresholds,
  emailReceiver: "ahmed.tawfik.at10@gmail.com",
};

const app = express();
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
  res.status(200).send("data updated");
});

app.get("/thresholds", (req, res) => {
  res.send(data.thresholds);
});

app.post("/thresholds", (req, res) => {
  if (!req.body) res.status(406).send("Can't Accept Null Data");

  data.thresholds = req.body;
  res.sendStatus(200);
});

app.get("/email", (req, res) => {
  res.send(data.emailReceiver);
});

app.post("/email", (req, res) => {
  if (!req.body) res.status(406).send("Can't Accept Null Data");

  data.emailReceiver = req.body.email;

  res.status(200).send("email set");
});

appWs.app.ws("/ws", (ws, r) => {
  console.log(`Connected with ${r.socket.remoteAddress}`);
  ws.on("message", msg => {
    const jsonMsg = JSON.parse(msg.toString());
    if (jsonMsg.api_key !== API_KEY) return;
    delete jsonMsg.api_key;

    
    handleThreshold(jsonMsg);
    data.weather = jsonMsg;
  
  });

  ws.on("close", () => {
    console.log(`${r.socket.remoteAddress} Connection Closed`);
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://127.0.0.1:${port}`);
});

async function handleThreshold(weatherData: Weather) {
  console.log("Handling Threshold");

  Object.keys(weatherData).find(k => weatherData[k] > thresholds[k]) &&
    sendMail(weatherData, data.emailReceiver);
}
