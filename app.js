"use strict";
const express = require("express");
const app = express();

const multer = require("multer");
var storage = multer.diskStorage({
  destination: __dirname + "/inputs/",
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
var upload = multer({ storage: storage });

const { execFile } = require("child_process");

app.use((req, res, next) => {
  // allow CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/upload", upload.single("file"), (req, res) => {
  if (req.body) {
    // res.json(req.file)
  } else throw "error";

  execFile("python", ["predict.py"], (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(stdout);
    res.send(stdout);
  });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}.`));

module.exports = app;
