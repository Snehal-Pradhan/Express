const express = require("express");
const users = require("./data/MOCK_DATA.json");
const app = express();
const PORT = process.env.PORT || 3000;
const host = "localhost";

app.get("/", (req, res) => {
  res.send("home route");
});
app.get("/about", (req, res) => {
  res.send("about");
});
app.get("/api/users", (req, res) => {
  res.json(users);
});
app.get("/api/users/:id", (req, res) => {
  if (!/^\d+$/.test(req.params.id)) {
    return res.status(400).send("Bad Request: Invalid ID");
  }

  const parsedid = parseInt(req.params.id, 10);

  if (isNaN(parsedid)) {
    return res.status(400).send("Bad Request: Invalid ID");
  }
  const findid = users.find((user) => user.id === parsedid);

  if (!findid) {
    return res.status(404).send("User not found");
  }

  res.status(200).json(findid);
});

app.post("/users", (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server listening at http://${host}:${PORT}`);
});
