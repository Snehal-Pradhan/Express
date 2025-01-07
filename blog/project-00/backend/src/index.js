const express = require("express");
const users = require("./data/MOCK_DATA.json");
const app = express();
const PORT = process.env.PORT || 3000;
const host = "localhost";

app.use(express.json());

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
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.status(200).send("user added succesfully");
});

app.put("/api/users/:id", (req, res) => {
  if (!/^\d+$/.test(req.params.id)) {
    return res.status(400).send("Bad Request: Invalid ID");
  }

  const {
    body,
    params: { id },
  } = req;

  const parsedid = parseInt(id);

  if (isNaN(parsedid)) {
    return res.status(400).send("Bad Request: Invalid ID");
  }

  if (!parsedid) {
    return res.status(404).send("User not found");
  }
  const findUserIndex = users.findIndex((user) => user.id === parsedid);
  if (findUserIndex === -1) res.end("Invalid Id").sendStatus(400);
  users[findUserIndex] = { id: parsedid, ...body };
  return res.send("Updated successfully");
});

app.patch("/api/users/:id", (req, res) => {
  if (!/^\d+$/.test(req.params.id)) {
    return res.status(400).send("Bad Request: Invalid ID");
  }

  const {
    body,
    params: { id },
  } = req;

  const parsedid = parseInt(id);
  if (isNaN(parsedid)) {
    return res.status(400).send("Bad Request: Invalid ID");
  }

  if (!parsedid) {
    return res.status(404).send("User not found");
  }
  const findUserIndex = users.findIndex((user) => user.id === parsedid);
  if (findUserIndex === -1) res.end("Invalid Id").sendStatus(400);
  users[findUserIndex] = { ...users[findUserIndex], ...body };
  return res.send("Updated successfully");
});

app.delete("/api/users/:id", (req, res) => {
  const {
    params: { id },
  } = req;

  if (!/^\d+$/.test(id)) {
    return res.status(400).send("Bad Request: Invalid ID");
  }

  const parsedid = parseInt(id, 10);

  const findUserIndex = users.findIndex((user) => user.id === parsedid);
  if (findUserIndex === -1) {
    return res.status(404).send("User not found");
  }

  users.splice(findUserIndex, 1);

  return res.status(200).send("User Deleted");
});

app.listen(PORT, () => {
  console.log(`Server listening at http://${host}:${PORT}`);
});
