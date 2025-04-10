require("dotenv").config();
const express = require("express");
const { Logtail } = require("@logtail/js");

const app = express();
const port = process.env.PORT || 10000;
const logtail = new Logtail('Ew4KHV2ZLcbekkEeE5sLrQQK');

app.use(express.json());

// Ghi log toàn bộ request
app.use(async (req, res, next) => {
  const logData = {
    method: req.method,
    url: req.originalUrl,
    headers: req.headers,
    body: req.body,
  };

  // Gửi log đến Logtail
  await logtail.info("Incoming request", logData);

  // In ra console để xem trên Render/Railway
  console.log(JSON.stringify(logData, null, 2));

  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Hello from Node.js + Logtail API!" });
});

app.post("/echo", (req, res) => {
  res.json({ you_sent: req.body });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
