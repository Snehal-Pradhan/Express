const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;
const host = "localhost"; // Add quotes around 'localhost'

app.get("/", (req, res) => {
  res.send("home route");
});
app.get("/about", (req, res) => {
  res.send("about");
});

app.listen(PORT, () => {
  console.log(`Server listening at http://${host}:${PORT}`);
});
