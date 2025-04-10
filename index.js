require("dotenv").config();
const express = require("express");
const { Logtail } = require("@logtail/node");
const logtail = new Logtail("Ew4KHV2ZLcbekkEeE5sLrQQK", {
  endpoint: 'https://eu-nbg-2-vec.betterstackdata.com',
});

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(async (req, res, next) => {
  const logData = {
    method: req.method,
    url: req.originalUrl,
    headers: req.headers,
    body: req.body,
  };

  await logtail.info("Request received", logData);
  console.log(JSON.stringify(logData, null, 2));

  next();
});

app.get("/", (req, res) => {
  res.send("Hello from Logtail-powered API!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
