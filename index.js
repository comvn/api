require("dotenv").config();
const express = require("express");
const { Logtail } = require("@logtail/js");

const app = express();
const logtail = new Logtail('Ew4KHV2ZLcbekkEeE5sLrQQK');
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
  res.send("Hello with Logtail!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
