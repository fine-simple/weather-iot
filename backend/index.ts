import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const data = { weather: {} };

app.get("/", (req, res) => {
  res.send("<h1>Working</h1>");
});

app.get("/api", (req, res) => {
  res.send();
});

app.post("/api", (req, res) => {
  data.weather = req.body;
  console.log(req.body);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
