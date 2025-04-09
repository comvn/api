const express = require("express");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 10000;

app.use(express.json()); // Cho phép đọc JSON body

// Ghi log mọi request
app.use((req, res, next) => {
  const log = `
[${new Date().toISOString()}] ${req.method} ${req.originalUrl}
Headers: ${JSON.stringify(req.headers, null, 2)}
Body: ${JSON.stringify(req.body, null, 2)}
-------------------------
`;

  fs.appendFileSync("logs.txt", log); // Ghi log vào file
  console.log(log); // In ra console để Render hoặc Railway cũng hiển thị
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Logging full request!" });
});

app.post("/test", (req, res) => {
  res.json({ received: req.body });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
