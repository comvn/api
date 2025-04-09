const express = require("express");
const app = express();
const port = process.env.PORT || 10000;

app.get("/", (req, res) => {
  res.json({ message: "Hello from Node.js API on Render!" });
});

app.get("/add", (req, res) => {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  res.json({ result: a + b });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
