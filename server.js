const express = require("express");
const app = express();
const port = 3000;

const { execFile } = require('child_process');
const agora = require("./agora.js");

app.get("/", async (req, res) => {

  const rawData = await agora();

  execFile('python', ['cleandata.py',rawData], (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    res.send(stdout);
  });

});

app.listen(port, () => console.log(`Listening on port ${port}!`));
