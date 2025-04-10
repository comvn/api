require("dotenv").config();
const express = require("express");
const { Node: Logtail } = require("@logtail/js");
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

  //logtail.info("Request received", logData);
  // Ensure that all logs are sent to Logtail
  //logtail.flush()

  try {
    await logtail.info("Request received", logData);
  } catch (err) {
    console.error("❌ Logtail error:", err.message);
  }
  
  console.log(JSON.stringify(logData, null, 2));

  next();
});

app.get("/", (req, res) => {
  res.json({ message: "OK" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
