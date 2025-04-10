require("dotenv").config();
const express = require("express");


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

  
  console.log(JSON.stringify(logData, null, 2));

  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Get OK" });
});

app.post("/", (req, res) => {
  res.json({ message: "Post OK" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
