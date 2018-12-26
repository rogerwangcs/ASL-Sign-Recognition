"use strict";

const express = require("express");
const app = express();

const { execFile } = require("child_process");
const agora = require("./agora.js");

app.use((req, res, next) => {
  // allow CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", async (req, res) => {
  const rawData = await agora();

  execFile("python", ["cleandata.py", rawData], (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log("Balance Fetched!")
    res.send(stdout);
  });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}.`));

module.exports = app;
