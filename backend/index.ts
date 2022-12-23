import express from "express";
import expressWs from "express-ws";
import path from "path";
import fs from "fs";
import { handleThreshold } from "./threshold";

const API_KEY = "tPmAT5Ab3j7F9";

const weather: Weather = {
  timestamp: -1,
  temp: -1,
  humidity: -1,
  pressure: -1,
  altitude: -1,
};

const data = {
  weather,
  thresholds: {
    temp: 30,
    humidity: 65,
    pressure: 102000,
    altitude: 80,
  },
  emailReceivers: "ahmed.tawfik.at10@gmail.com",
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

app.get("/thresholds", (_, res) => {
  res.send(data.thresholds);
});

app.post("/thresholds", (req, res) => {
  if (!req.body) res.status(406).send("Can't Accept Null Data");

  data.thresholds = req.body;
  res.sendStatus(200);
});

app.get("/email", (_, res) => {
  res.send(data.emailReceivers);
});

app.post("/email", (req, res) => {
  if (!req.body) res.status(406).send("Can't Accept Null Data");

  data.emailReceivers = req.body.email;

  res.status(200).send("email set");
});

app.get("/data", (_, res) => {
  createDataFile()
    .then(_ => res.download("data/data.csv"))
    .catch(_ => res.status(500).send("Couldn't create Data File"));
});

appWs.app.ws("/ws", (ws, r) => {
  console.log(`Connected with ${r.socket.remoteAddress}`);
  ws.on("message", msg => {
    const json = JSON.parse(msg.toString());
    if (json.api_key !== API_KEY) return;
    delete json.api_key;

    json.timestamp = Date.now();
    appendToData(json);
    handleThreshold(data.thresholds, data.emailReceivers, json);

    data.weather = json;
  });

  ws.on("close", () => {
    console.log(`${r.socket.remoteAddress} Connection Closed`);
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://127.0.0.1:${port}`);
});

async function createDataFile() {
  await fs.promises.mkdir("data").catch(_ => null);
  if (!fs.existsSync("data/data.csv"))
    fs.promises.writeFile(
      "data/data.csv",
      Object.keys(weather).join(",") + "\n"
    );
}

async function appendToData(weatherData: Weather) {
  await createDataFile();

  // make timestamp first column
  weatherData = Object.assign({ timestamp: null }, weatherData);

  fs.appendFileSync(
    "data/data.csv",
    Object.values(weatherData).join(",") + "\n"
  );
}
